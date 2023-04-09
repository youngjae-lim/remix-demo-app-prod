import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useTransition,
} from '@remix-run/react'
import { FaLock, FaUserPlus } from 'react-icons/fa'

function AuthForm() {
  // Get the search params from the URL
  const [searchParams] = useSearchParams()

  // Get the auth mode from the search params
  const authMode = searchParams.get('mode') || 'login'

  // Get the validation errors from the action data that was returned from the action
  const validationErrors = useActionData()

  // Set the submit button caption based on the auth mode
  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Sign Up'

  // Set the toggle button caption based on the auth mode
  const toggleBtnCaption =
    authMode === 'login' ? 'Create an account' : 'Log in with existing user'

  // Get the transition state from the useTransition hook
  const transition = useTransition()
  // Check if the transition state is submitting
  const isSubmitting = transition.state !== 'idle'

  return (
    <Form method='post' className='form' id='auth-form'>
      <div className='icon-img'>
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor='email'>Email Address</label>
        <input type='email' id='email' name='email' required />
      </p>
      <p>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' minLength={7} />
      </p>
      {/* Add a message block for validation errors */}
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className='form-actions'>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Authenticating...' : submitBtnCaption}
        </button>
        <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  )
}

export default AuthForm
