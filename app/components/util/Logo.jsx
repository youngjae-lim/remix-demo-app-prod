import { Link } from '@remix-run/react'

// Logo is a component for displaying the logo
function Logo() {
  return (
    <h1 id='logo'>
      <Link to='/'>RemixExpenses</Link>
    </h1>
  )
}

export default Logo
