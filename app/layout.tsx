"use client"

// import type { Metadata } from "next";
import { Noto_Sans_KR } from 'next/font/google';
import "./globals.css";
import Loading from "./loading";
import { Suspense, useState } from "react";

import { UserContext } from '@/context/UserContext';
import { IUserInfo } from "@/types";

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
});

// head.tsx 파일로 분리
// export const metadata: Metadata = {
//   title: "Gradap",
//   description: "그래! 그래 답 홈페이지 입니다",
//   icons: {
//     icon: '/logo192.png',
//     apple: '/logo192.png',
//   },
//   manifest: '/manifest.json',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [user, setUser] = useState<IUserInfo | null>(null);

  return (
    <html lang="ko"  suppressHydrationWarning>
      <body className={notoSansKr.className}>
        <UserContext.Provider value={{user, setUser}}>

          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>

        </UserContext.Provider>
      </body>
    </html>
  );
}
