import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import Header from "@/components/Header";
import Providers from "./Providers"; // 作成したProvidersをインポート

export const metadata = {
  title: "NextRent | 次世代のレンタカー予約体験",
  description: "Next.jsとFirebaseで構築された、高速でモダンなレンタカー予約サイト。",
};

export default function RootLayout({ children, params }) { // paramsを受け取る
  const { locale } = params; // localeをparamsから取得

  return (
    <html lang={locale} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-gray-50 text-gray-800">
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
