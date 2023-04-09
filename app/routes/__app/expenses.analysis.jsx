// /expenses/analysis route
import ExpenseStatistics from '~/components/Expenses/ExpenseStatistics'
import Chart from '~/components/Expenses/Chart'
import { getExpenses } from '~/data/expenses.server'
import { useCatch, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import Error from '~/components/util/Error'
import { requireUserSession } from '~/data/auth.server'

// Page for /expenses/analysis route
export default function ExpensesAnalysisPage() {
  // Load expenses
  const expenses = useLoaderData()

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  )
}

// Add loader to ExpensesAnalysisPage
export const loader = async ({ request }) => {
  // Require user session and get user id
  const userId = await requireUserSession(request)

  // Get expenses
  const expenses = await getExpenses(userId)

  // Throw error if no expenses found
  if (!expenses || expenses.length === 0) {
    throw json(
      {
        message: 'Could not load expenses for the requested analysis.',
      },
      {
        status: 404,
        statusText: 'Expenses not found',
      },
    )
  }
  return expenses
}

// Add catch boundary to ExpensesAnalysisPage
export function CatchBoundary() {
  // Get error
  const caughtResponse = useCatch()

  // Return error page
  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            'Something went wrong - could not load expenses.'}
        </p>
      </Error>
    </main>
  )
}
