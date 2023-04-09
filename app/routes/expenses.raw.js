// /expenses/raw route
import { getExpenses } from '~/data/expenses.server'
import { requireUserSession } from '~/data/auth.server'

// Add loader function to fetch data from the server
export const loader = async ({ request }) => {
  // Require user session and get user id
  const userId = await requireUserSession(request)

  return getExpenses(userId)
}
