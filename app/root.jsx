import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from '@remix-run/react'

import sharedStyles from '~/styles/shared.css'
import Error from '~/components/util/Error'

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

function Document({ title, children }) {
  return (
    <html lang='en'>
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  // useMatches() returns an array of all the matches for the current route
  const matches = useMatches()

  // If any of the matches have a handle.disableJS property set to true, we'll disable JS
  const disableJS = matches.some((match) => match.handle?.disableJS)

  return (
    <html lang='en'>
      <head>
        <Meta />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  )
}

// CatchBoundary is a component that catches errors and renders a fallback UI
export function CatchBoundary() {
  // useCatch() returns the error that was thrown, if any
  const caughtResponse = useCatch()

  return (
    <Document title={caughtResponse.statusText}>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            'Something went wrong. Please try again later.'}
        </p>
        <p>
          Back to <Link to='/'>safety</Link>.
        </p>
      </Error>
    </Document>
  )
}

// ErrorBoundary is a component that catches any unhandled errors and renders a fallback UI
export function ErrorBoundary({ error }) {
  return (
    <Document title='An error occurred'>
      <Error title='An error occurred'>
        <p>
          {error.message || 'Something went wrong. Please try again later.'}
        </p>
        <p>
          Back to <Link to='/'>safety</Link>.
        </p>
      </Error>
    </Document>
  )
}
// Add shared styles to the <head> of the document
export const links = () => [{ rel: 'stylesheet', href: sharedStyles }]
