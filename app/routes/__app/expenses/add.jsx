import { useNavigate } from '@remix-run/react'
import ExpenseForm from '~/components/Expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { addExpense } from '~/data/expenses.server'
import { redirect } from '@remix-run/node'
import { validateExpenseInput } from '~/data/validation.server'
import { requireUserSession } from '~/data/auth.server'

// Page for /expenses/add route
export default function AddExpensesPage() {
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

// Add action to AddExpensesPage
export const action = async ({ request }) => {
  // Get the user id from the session
  const userId = await requireUserSession(request)

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

  // Add the expense to the database
  await addExpense(expenseData, userId)

  // Redirect to /expenses route
  return redirect('/expenses')
}
