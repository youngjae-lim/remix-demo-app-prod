import { NavLink, useLoaderData, Form, Link } from '@remix-run/react'

import Logo from '../util/Logo'

// ExpensesHeader is a component for displaying the header for Authenticated routes
function ExpensesHeader() {
  // Get user id from useLoaderData
  const userId = useLoaderData()

  return (
    <header id='main-header'>
      <Logo />
      <nav id='main-nav'>
        <ul>
          <li>
            <NavLink to='/expenses' end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to='/expenses/analysis'>Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id='cta-nav'>
        {userId && (
          <Form method='POST' action='/logout' id='logout-form'>
            <button className='cta-alt'>Logout</button>
          </Form>
        )}
        {!userId && (
          <Link to='/auth' className='cta'>
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}

export default ExpensesHeader
