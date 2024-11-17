import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "zh"];
const defaultLocale = "en";
const cookieName = "i18nlang";

// 获取用户的首选语言
function getLocale(request) {
  // 从 Cookie 获取语言
  if (request.cookies.has(cookieName)) {
    return request.cookies.get(cookieName).value || defaultLocale;
  }

  // 从请求头的 Accept-Language 获取语言
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;

  // 使用 Negotiator 匹配支持的语言
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 检查 URL 中是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 获取语言
  const locale = getLocale(request);

  // 设置 Cookie，如果尚未设置
  const response = NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
  if (!request.cookies.has(cookieName)) {
    response.cookies.set(cookieName, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
