import expensesStyles from '~/styles/expenses.css'
import ExpensesHeader from '~/components/navigation/ExpensesHeader'
import { Outlet } from '@remix-run/react'
import { getUserFromSession } from '~/data/auth.server'

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  )
}

// Get the user from the session
export function loader({ request }) {
  return getUserFromSession(request)
}

// Add styles to ExpensesAppLayout
export const links = () => [{ rel: 'stylesheet', href: expensesStyles }]
