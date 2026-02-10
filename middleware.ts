import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // If accessing from start.lumensolar.energy subdomain
  if (hostname.startsWith('start.')) {
    // If at root path, rewrite to /start (serves /start content but keeps URL as root)
    if (request.nextUrl.pathname === '/') {
      return NextResponse.rewrite(new URL('/start', request.url));
    }
    // If accessing any other path, prepend /start to the path
    if (!request.nextUrl.pathname.startsWith('/start')) {
      const newPath = `/start${request.nextUrl.pathname}`;
      return NextResponse.rewrite(new URL(newPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
