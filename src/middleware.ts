import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Generate a fresh nonce for every request. The nonce is:
  //   1. Forwarded to the root layout via the x-nonce request header so that
  //      Next.js can attach it to any inline scripts it emits.
  //   2. Embedded in the Content-Security-Policy response header so the browser
  //      accepts those nonce-tagged scripts.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic' allows scripts loaded by a nonce-tagged script to run
    // without each needing its own nonce (needed for Next.js chunk loading).
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    // 'unsafe-inline' is required for Tailwind's runtime style injection and
    // Leaflet's dynamic CSS. Restricting further would require significant
    // refactoring of both libraries.
    "style-src 'self' 'unsafe-inline'",
    // Leaflet marker images are loaded as data: URIs.
    // CARTO tile images are loaded from *.basemaps.cartocdn.com.
    "img-src 'self' data: https://*.basemaps.cartocdn.com",
    // API calls go to the same origin only. No external fetch targets.
    "connect-src 'self'",
    // Inter font is served by Next.js from _next/static — same origin.
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    // Matches X-Frame-Options: DENY set in next.config.ts.
    "frame-ancestors 'none'",
  ].join("; ");

  // Pass the nonce downstream so the root layout can attach it to script tags.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
