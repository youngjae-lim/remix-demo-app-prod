import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { FaDownload, FaPlus } from 'react-icons/fa'
import ExpensesList from '~/components/expenses/ExpensesList'
import { getExpenses } from '~/data/expenses.server'
import { requireUserSession } from '~/data/auth.server'
import { json } from '@remix-run/node'

// Shared layout for /expenses routes
export default function ExpensesLayout() {
  // Load expenses data from loader
  const expenses = useLoaderData()

  const hasExpenses = expenses && expenses.length > 0

  return (
    <>
      <Outlet />
      <main>
        <section id='expenses-actions'>
          <Link to='add'>
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href='/expenses/raw'>
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id='no-expenses'>
            <h1>No expenses found</h1>
            <p>
              Start <Link to='add'>adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  )
}

// Add loader to ExpensesLayout
export const loader = async ({ request }) => {
  // Require user session
  const userId = await requireUserSession(request)

  // Get expenses
  const expenses = await getExpenses(userId)

  // Return json response with expenses and cache-control header
  return json(expenses, {
    headers: {
      'cache-control': 'max-age=3', // 3 seconds
    },
  })
}

// Add headers
export const headers = ({ loaderHeaders }) => {
  return {
    'cache-control': loaderHeaders.get('cache-control'),
  }
}
