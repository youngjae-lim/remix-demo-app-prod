import { FaTrophy, FaHandshake } from 'react-icons/fa'
import PricingPlan from '~/components/marketing/PricingPlan'

// Make a dummy data for pricing plans
const PRICING_PLANS = [
  {
    id: 'p1',
    title: 'Basic',
    price: 'Free forever',
    perks: ['1 User', 'Up to 100 expenses/year', 'Basic analytics'],
    icon: FaHandshake,
  },
  {
    id: 'p2',
    title: 'Pro',
    price: '$9.99/month',
    perks: ['Unlimited Users', 'Unlimited expenses/year', 'Detailed analytics'],
    icon: FaTrophy,
  },
]

// Page for /pricing route
export default function PricingPage() {
  return (
    <main id='pricing'>
      <h2>Great Product, Simple Pricing</h2>
      <ol id='pricing-plans'>
        {PRICING_PLANS.map((plan) => (
          <li key={plan.id} className='plan'>
            <PricingPlan
              title={plan.title}
              price={plan.price}
              perks={plan.perks}
              icon={plan.icon}
            />
          </li>
        ))}
      </ol>
    </main>
  )
}

// Meta data for /app/routes/__marketing/pricing.jsx which overwrites the default /app/root.jsx meta data
export function meta() {
  return {
    title: 'Pricing',
    description: 'Simple pricing for a simple product.',
  }
}

// Configure headers from the home page (app/routes/__marketing/index.jsx)
export function headers({ parentHeaders }) {
  return {
    'Cache-Control': parentHeaders.get('Cache-Control'), // 1 hour
  }
}

// Disable javascript for this page
export const handle = { disableJS: true }
