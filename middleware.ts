import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const session = req.cookies.get('sb-access-token');

  const rotaPrivada = req.nextUrl.pathname.startsWith('/dashboard') ||
                      req.nextUrl.pathname.startsWith('/agenda');

  if (rotaPrivada && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
