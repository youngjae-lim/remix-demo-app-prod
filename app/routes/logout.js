import { json } from '@remix-run/node'
import { destroyUserSession } from '~/data/auth.server'

// Add action to the logout route
export function action({ request }) {
  // If the request method is not POST, throw an error
  if (request.method !== 'POST') {
    throw json({
      message: 'Invalid',
      status: 400,
    })
  }

  // Otherwise, destroy the user session
  return destroyUserSession(request)
}
