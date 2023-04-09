import {
  Form,
  Link,
  useMatches,
  useParams,
  useActionData,
  useTransition,
} from '@remix-run/react'

// ExpenseForm is a form for adding or updating an expense
function ExpenseForm() {
  // Get today's data in ISO format
  const today = new Date().toISOString().slice(0, 10) // yields something like 2023-09-10

  // Add useActionData hook to get the action data
  const validationErrors = useActionData()

  // Get expense id from params
  const params = useParams()

  // Add useTransition hook
  const transition = useTransition()

  // Add useMatches hook to check if the route matches /expenses/add
  const matches = useMatches()

  // Get the expenses data from matches
  const expenses = matches.find(
    (match) => match.id === 'routes/__app/expenses'
  ).data

  // Get the expense data from expenses
  const expense = expenses.find((expense) => expense.id === params.id)

  // Check if expense is not found
  if (params.id && !expense) {
    return <p>Invalid expense id.</p>
  }

  // Set default values for the form
  const defaultValues = expense
    ? {
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
      }
    : {
        title: '',
        amount: '',
        date: '',
      }

  // Add isSubmitting variable to check if the form is submitting
  const isSubmitting = transition.state !== 'idle'

  // Return the expense form
  return (
    <Form
      method={expense ? 'patch' : 'post'}
      className='form'
      id='expense-form'
    >
      <p>
        <label htmlFor='title'>Expense Title</label>
        <input
          type='text'
          defaultValue={defaultValues.title}
          id='title'
          name='title'
          required
          maxLength={30}
        />
      </p>

      <div className='form-row'>
        <p>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            defaultValue={defaultValues.amount}
            id='amount'
            name='amount'
            min='0'
            step='0.01'
            required
          />
        </p>
        <p>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ''
            }
            id='date'
            name='date'
            max={today}
            required
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className='form-actions'>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Expense'}
        </button>
        <Link to='..'>Cancel</Link>
      </div>
    </Form>
  )
}

export default ExpenseForm
