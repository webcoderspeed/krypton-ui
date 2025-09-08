import { NextRequest, NextResponse } from 'next/server';
import { availableVersions } from './lib/routes-config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path starts with /docs but doesn't have a version prefix
  if (pathname.startsWith('/docs/') && !pathname.startsWith('/docs/v')) {
    // Extract the path after /docs/
    const pathWithoutDocs = pathname.replace('/docs/', '');
    
    // Check if it's not already a versioned path
    const hasVersionPrefix = availableVersions.some(version => 
      pathWithoutDocs.startsWith(version)
    );
    
    if (!hasVersionPrefix) {
      // Redirect to the default version (first available version)
      const defaultVersion = availableVersions[0];
      const newUrl = new URL(`/docs/${defaultVersion}/${pathWithoutDocs}`, request.url);
      return NextResponse.redirect(newUrl);
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