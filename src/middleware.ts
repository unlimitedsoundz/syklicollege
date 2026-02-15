import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'fi'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Only act on the translation-example route without a locale prefix
    if (pathname === '/translation-example') {
        return NextResponse.redirect(new URL('/en/translation-example', request.url));
    }

    // Everything else passes through untouched
    return NextResponse.next();
}

export const config = {
    // Only run middleware on the specific demo route
    matcher: ['/translation-example'],
};
