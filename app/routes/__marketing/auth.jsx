import AuthForm from '~/components/Auth/AuthForm'
import authStyles from '~/styles/auth.css'
import { validateAuthInput } from '~/data/validation.server'
import { signup, login } from '~/data/auth.server'

// Page for /auth route
export default function AuthPage() {
  return <AuthForm />
}

// action processes the auth form data and returns the error if any
export const action = async ({ request }) => {
  // Get search params from URL().searchParams
  const searchParams = new URL(request.url).searchParams

  // Get the auth mode from search params
  const authMode = searchParams.get('mode') || 'login'

  // Get the form data from the request
  const formData = await request.formData()
  // Convert the form data to an object
  const authData = Object.fromEntries(formData)

  // Validate the auth data and return the error if any
  try {
    validateAuthInput(authData)
  } catch (error) {
    return error
  }

  try {
    // Check if the auth mode is login
    if (authMode === 'login') {
      // Login the user
      return await login(authData)
    } else {
      // Create a new user
      return await signup(authData)
    }
  } catch (error) {
    // If error is 422, 401, or 403, return { credentials: error. message }
    if (/(422|401|403)/.test(error.status)) {
      return { credentials: error.message }
    }
    return { credentials: 'Something went wrong. Please try again.' }
  }
}

// Add auth styles to the <head> of the document
export const links = () => [{ rel: 'stylesheet', href: authStyles }]

// Configure headers from the home page (app/routes/__marketing/index.jsx)
export function headers({ parentHeaders }) {
  return {
    'Cache-Control': parentHeaders.get('Cache-Control'), // 1 hour
  }
}
