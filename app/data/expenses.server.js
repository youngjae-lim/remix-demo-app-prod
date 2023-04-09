import { prisma } from './database.server'

// Add a new expense to the database for the user
export async function addExpense(expenseData, userId) {
  try {
    await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Get all expenses from the database for the user
export async function getExpenses(userId) {
  // Check if user id is provided
  if (!userId) {
    throw new Error('User id is required.')
  }

  // Get all expenses for the user
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId: userId },
      orderBy: { date: 'desc' },
    })
    return expenses
  } catch (error) {
    throw new Error('Failed to get expenses.')
  }
}

// Get a single expense from the database
export async function getExpense(id) {
  try {
    const expense = await prisma.expense.findFirst({
      where: { id },
    })
    return expense
  } catch (error) {
    throw new Error('Failed to get expense.')
  }
}

// Update an expense in the database
export async function updateExpense(id, expenseData) {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    })
  } catch (error) {
    throw new Error('Failed to update expense.')
  }
}

// Delete an expense from the database
export async function deleteExpense(id) {
  try {
    await prisma.expense.delete({
      where: { id },
    })
  } catch (error) {
    throw new Error('Failed to delete expense.')
  }
}
