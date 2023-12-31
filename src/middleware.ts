import { verifyToken } from '@/server-utils/jwt-utils'
import { NextRequest, NextResponse } from 'next/server'
import { DEFAULT_ROUTE } from './app/default-route'

function redirect(
  { nextUrl: { protocol, host } }: NextRequest,
  path: string,
  searchParams: Record<string, string> = {}
): NextResponse {
  const base = `${protocol}//${host}`
  const url = new URL(path, base)

  for (const key in searchParams) {
    url.searchParams.set(key, searchParams[key])
  }

  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     *
     * Reference: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

/*
 * We're combining middleware matchers with conditionals:
 * - middleware matchers are used to exclude stuff which aren't actual routes of the app
 *   - includes assets, etc
 * - conditional code is used to do actual route matching
 *
 * using only middleware can be a challenge since we have to update the regexp each time we have
 * a new public route.
 *
 * using only the conditional code is buggy since it'll also end up blocking asset calls.
 */

export default async function middleware(
  req: NextRequest
): Promise<NextResponse> {
  const token = req.cookies.get('token')?.value
  const isTokenValid = token && (await verifyToken(token))

  const destPath = req.nextUrl.pathname
  if (isTokenValid) {
    if (
      destPath === '/' ||
      /*
       * If the user is logged in, we don't want them to see the log-in screen again
       * even if they deliberately tried to go there.
       */
      destPath === '/login'
    ) {
      return redirect(req, DEFAULT_ROUTE)
    }

    return NextResponse.next()
  }

  let res: NextResponse

  if (destPath === '/login' || destPath === '/root-setup') {
    res = NextResponse.next()
  } else {
    res = redirect(req, '/login', {
      loginRedirect: `${destPath}${req.nextUrl.search}`,
    })
  }

  if (token && !isTokenValid) {
    res.cookies.delete('token')
  }

  return res
}
