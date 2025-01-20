
import type { Metadata } from "next";
import { Noto_Sans_KR } from 'next/font/google';
import "./globals.css";
import Loading from "./loading";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

// 폰트 설정
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Gradap",
  description: "그래! 그래 답 홈페이지 입니다",
  icons: {
    icon: '/logo192.png',
    apple: '/logo192.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko"  suppressHydrationWarning>
        
      <body className={notoSansKr.className}>
          <Suspense fallback={<Loading />}>
            {children}

            <div className="fixed bottom-0 left-0 right-0 z-50">
              <Navbar />
            </div>

          </Suspense>
      </body>
    </html>
  );
}
