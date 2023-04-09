import marketingStyles from '~/styles/marketing.css'
import MainHeader from '~/components/navigation/MainHeader'
import { Outlet } from '@remix-run/react'
import { getUserFromSession } from '~/data/auth.server'

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  )
}

// Get the user from the session
export function loader({ request }) {
  return getUserFromSession(request)
}

// Add styles to ExpensesAppLayout
export const links = () => [{ rel: 'stylesheet', href: marketingStyles }]

// Configure headers which will be sent witht the response
// Note that children of this route will inherit these headers
export function headers() {
  return {
    // Cache the home page for 1 hour
    'Cache-Control': 'max-age=3600', // 1 hour
  }
}
