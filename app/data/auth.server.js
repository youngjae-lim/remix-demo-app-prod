import { hash, compare } from 'bcryptjs'
import { prisma } from './database.server'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

// Load session secret from .env file
const SESSION_SECRET = process.env.SESSION_SECRET

// Create a session storage
const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax', // prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    httpOnly: true, // prvent client side access
  },
})

// Create a session loader
async function createUserSession(userId, redirectPath) {
  // Get a session
  const session = await sessionStorage.getSession()

  // Set the user id in the session
  session.set('userId', userId)

  // Return redirect action with the session cookie
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}

// Get the user from the session and return user id
export async function getUserFromSession(request) {
  // Get the session from the session storage
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  // Get the user id from the session
  const userId = session.get('userId')

  // If user id is not set, return null
  if (!userId) return null

  // Return the user
  return userId
}

// Destory the session and return a redirect action
export async function destroyUserSession(request) {
  // Get a session
  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  // Redirect to the home page with the session cookie destroyed
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  })
}

// Require user session middleware and throw a redirect action if user is not logged in
// If user is logged in, it will return the user id
export async function requireUserSession(request) {
  // Get the user id from the session
  const userId = await getUserFromSession(request)

  // If user id is not set, throw a redirect action to login page
  if (!userId) {
    throw redirect('/auth?mode=login')
  }

  return userId
}

// signup function signs up a new user and returns a session
export async function signup({ email, password }) {
  // Get the exsisting user with the email
  const existinUser = await prisma.user.findFirst({ where: { email } })

  // If user exists, throw an error
  if (existinUser) {
    const error = new Error('User already exists.')
    error.status = 422
    throw error
  }

  // Hash the password
  const hashedPassword = await hash(password, 12)

  // Create a new user
  const user = await prisma.user.create({
    data: { email: email, password: hashedPassword },
  })

  // Return user session
  return createUserSession(user.id, '/expenses')
}

// login function logs in an existing user and returns a session
export async function login({ email, password }) {
  // Get the user with the email
  const user = await prisma.user.findFirst({ where: { email } })

  // If user does not exist, throw an error
  if (!user) {
    const error = new Error(
      'Could not log you in, please check your credentials.',
    )
    error.status = 401
    throw error
  }

  // Compare the password with the hashed password
  const isValidPassword = await compare(password, user.password)

  // If password is not valid, throw an error
  if (!isValidPassword) {
    const error = new Error('Invalid password.')
    error.status = 401
    throw error
  }

  // Return user session
  return createUserSession(user.id, '/expenses')
}
