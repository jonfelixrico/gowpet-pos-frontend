import { verifyToken } from '@/utils/jwt-utils'
import { NextRequest, NextResponse } from 'next/server'
import { redirect } from './utils/next-utils'

export default async function middleware(req: NextRequest) {
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
