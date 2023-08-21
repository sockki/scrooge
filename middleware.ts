import { useRouter } from "next/router";
import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {

  if (userAgent(req).isBot) {
    return new Response("plz don't be a bot");
  }

  if (!req.url.includes("/api")) {
    if (!req.url.includes("/log-in") && !req.url.includes("/create-account")  && !req.cookies.has("mysession")) {
      return NextResponse.redirect(new URL('/log-in', req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};
