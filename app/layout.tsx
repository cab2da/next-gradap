"use client"

// import type { Metadata } from "next";
import { Noto_Sans_KR } from 'next/font/google';
import "./globals.css";
import Loading from "./loading";
import { Suspense, useState } from "react";

import { UserContext } from '@/context/UserContext';
import { IUserInfo } from "@/types";

import { metadata } from './head'; // head.tsx에서 메타데이터 가져오기
import Head from 'next/head';

// 폰트 설정
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

  const getIconHref = (): string | undefined => {
    // icons가 존재하는지 확인
    if (metadata.icons) {
      if (typeof metadata.icons === 'string') {
        // IconURL인 경우
        return metadata.icons;
      } else if (Array.isArray(metadata.icons)) {
        // Icons가 배열인 경우
        const firstIcon = metadata.icons[0];
        if (firstIcon instanceof URL) {
          return firstIcon.toString(); // URL을 문자열로 변환
        } else if (typeof firstIcon === 'string') {
          return firstIcon; // 문자열인 경우 그대로 반환
        }
      } else {
        // Icons가 객체인 경우
        if ('icon' in metadata.icons) {
          const icon = metadata.icons.icon;
          if (icon instanceof URL) {
            return icon.toString(); // URL을 문자열로 변환
          } else if (typeof icon === 'string') {
            return icon; // 문자열인 경우 그대로 반환
          }
        }
      }
    }
    return undefined; // icons가 없을 경우 undefined 반환
  };

  return (
    <html lang="ko"  suppressHydrationWarning>
        <Head>
        <title>{typeof metadata.title === 'string' ? metadata.title : '기본 제목'}</title>
        <meta name="description" content={typeof metadata.description === 'string' ? metadata.description : ''} />
        {getIconHref() && (
          <link rel="icon" href={getIconHref()} />
        )}
        {metadata.manifest && (
          <link rel="manifest" href={typeof metadata.manifest === 'string' ? metadata.manifest : (metadata.manifest as URL).toString()} /> // manifest를 string으로 변환
        )}
      </Head>

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
