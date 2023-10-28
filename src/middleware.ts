import { verifyToken } from '@/utils/jwt-utils'
import { NextRequest, NextResponse } from 'next/server'
import UrlPattern from 'url-pattern'
import { redirect } from './utils/next-utils'

function buildPatterns(routeStrings: string[]) {
  return routeStrings.map((route) => new UrlPattern(route))
}
const PUBLIC_ROUTES = buildPatterns(['/', '/login'])
function isRoutePublic(route: string) {
  return PUBLIC_ROUTES.some((pattern) => pattern.match(route))
}

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
