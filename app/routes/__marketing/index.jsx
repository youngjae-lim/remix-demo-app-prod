import { Link } from '@remix-run/react'
import { FaArrowRight, FaDollarSign, FaChartBar } from 'react-icons/fa'

export default function Index() {
  return (
    <main>
      <section className='marketing-section'>
        <header>
          <FaDollarSign />
          <h2>A Central Space</h2>
        </header>
        <div className='marketing-content'>
          <div className='marketing-image'>
            <img
              src='images/expenses-management.jpg'
              alt='A list of expenses.'
            />
          </div>
          <div className='marketing-explanation'>
            <p>Manage your expenses in one central place.</p>
            <p>
              <Link className='cta' to='/expenses'>
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className='marketing-section'>
        <header>
          <FaChartBar />
          <h2>Detailed Analytics</h2>
        </header>
        <div className='marketing-content'>
          <p className='marketing-explanation'>
            Benefit from best-in-class analytics to understand your spending
            patterns.
          </p>
          <div className='marketing-image'>
            <img src='images/expenses-chart.jpg' alt='A demo bar chart.' />
          </div>
        </div>
      </section>
    </main>
  )
}

// Meta data for the home page (app/routes/__marketing/index.jsx) which overwrites the default meta data (app/root.jsx)
export function meta() {
  return {
    title: 'Home - Remix Expenses',
    description: 'A central space to manage your expenses.',
  }
}

// Configure headers from the home page (app/routes/__marketing/index.jsx)
export function headers({ parentHeaders }) {
  return {
    'Cache-Control': parentHeaders.get('Cache-Control'), // 1 hour
  }
}

// Disable client-side javascript for the home page (app/routes/__marketing/index.jsx)
export const handle = { disableJS: true }
