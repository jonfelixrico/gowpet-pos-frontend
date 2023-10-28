import { verifyToken } from '@/utils/jwt-utils'
import { NextRequest, NextResponse } from 'next/server'
import UrlPattern from 'url-pattern'
import { redirect } from './utils/next-utils'

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

function buildPatterns(routeStrings: string[]) {
  return routeStrings.map((route) => new UrlPattern(route))
}
const PUBLIC_ROUTES = buildPatterns(['/', '/login'])
function isRoutePublic(route: string) {
  return PUBLIC_ROUTES.some((pattern) => pattern.match(route))
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

export default async function middleware(req: NextRequest) {
  if (isRoutePublic(req.nextUrl.pathname)) {
    console.debug('Public route; middleware will proceed')
    return NextResponse.next()
  }

  const token = req.cookies.get('token')?.value
  if (!token) {
    console.debug('No token found; redirecting')
    // TODO do something to generate a better redirect
    return redirect(req.nextUrl, '/login')
  }

  if (!(await verifyToken(token))) {
    console.debug('Invalid token; redirecting')
    // TODO do something to generate a better redirect
    return redirect(req.nextUrl, '/login')
  }

  return NextResponse.next()
}
