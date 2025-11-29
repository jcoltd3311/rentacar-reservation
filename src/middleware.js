
import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ja'],
  defaultLocale: 'ja',
  urlMappingStrategy: 'rewrite'
});

export function middleware(request) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).)*'],
};
