import { Link, useFetcher } from '@remix-run/react'

// ExpenseListItem is a component for displaying a single expense item
function ExpenseListItem({ id, title, amount }) {
  // Add useFetcher hook to fetch the deleteExpense action
  const fetcher = useFetcher()

  // Handler for deleting an expense item
  function deleteExpenseItemHandler() {
    // Ask for confirmation before deleting the expense
    const proceed = confirm('Are you sure you want to delete this expense?')

    // If the user cancels the deletion, return
    if (!proceed) return

    // fetcher submits a delete request to /expenses/:id without triggering a navigation
    fetcher.submit(null, { method: 'delete', action: `/expenses/${id}` })
  }

  if (fetcher.state !== 'idle') {
    return (
      <article className='expense-item locked'>
        <p>Deleting...</p>
      </article>
    )
  }

  // Render the expense item with title, amount, and edit and delete buttons
  return (
    <article className='expense-item'>
      <div>
        <h2 className='expense-title'>{title}</h2>
        <p className='expense-amount'>${amount.toFixed(2)}</p>
      </div>
      <menu className='expense-actions'>
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={`${id}`}>Edit</Link>
      </menu>
    </article>
  )
}

export default ExpenseListItem
