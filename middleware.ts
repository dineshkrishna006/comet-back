import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['http://localhost:3000']

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin')

  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response('Access Denied', { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: 'app/api/:path*', // Apply middleware to all API routes
}
