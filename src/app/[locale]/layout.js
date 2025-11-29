
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProviderClient } from '../../lib/i18n/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextRent | 次世代のレンタカー予約体験",
  description: "Next.jsとFirebaseで構築された、高速でモダンなレンタカー予約サイト。",
};

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <I18nProviderClient locale={locale}>
          {children}
        </I18nProviderClient>
      </body>
    </html>
  );
}
