// /expenses/<id> route
import { useNavigate } from '@remix-run/react'
import ExpenseForm from '~/components/Expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { validateExpenseInput } from '~/data/validation.server'
import { updateExpense, deleteExpense } from '~/data/expenses.server'
import { redirect } from '@remix-run/node'

// Page for /expenses/<id> route
export default function UpdateExpensePage() {
  // Add useNavigate hook to navigate to /expenses route
  const navigate = useNavigate()

  // Add closeHandler function to close the modal and navigate to a parent(/expenses) route
  const closeHandler = () => {
    navigate('..')
  }

  // Render the modal with ExpenseForm component
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  )
}

// Add action to UpdateExpensePage
export const action = async ({ params, request }) => {
  // Get the expense id from the params
  const { id } = params

  if (request.method === 'PATCH') {
    // Get the form data from the request
    const formData = await request.formData()
    // Convert the form data to an object
    const expenseData = Object.fromEntries(formData)

    // Validate the expense data and return the error if any
    try {
      validateExpenseInput(expenseData)
    } catch (error) {
      return error
    }

    // Update the expense in the database
    await updateExpense(id, expenseData)

    // Redirect to /expenses route
    return redirect('/expenses')
  } else if (request.method === 'DELETE') {
    // Delete the expense from the database
    await deleteExpense(id)

    // Redirect to /expenses route
    return redirect('/expenses')
  }
}

// Add metadata
export function meta({ params, parentsData }) {
  // Get matching expense from the parentsData['routes/__app/expenses']
  const expense = parentsData['routes/__app/expenses'].find(
    (expense) => expense.id === params.id,
  )

  return {
    title: `Update ${expense.title} item`,
    description: 'Update an expense.',
  }
}
