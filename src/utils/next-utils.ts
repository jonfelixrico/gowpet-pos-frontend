import { NextResponse } from 'next/server'

export function redirect(
  request: { protocol: string; host: string },
  path: string
): NextResponse {
  const base = `${request.protocol}//${request.host}`
  const url = new URL(path, base)

  return NextResponse.redirect(url.toString())
}
