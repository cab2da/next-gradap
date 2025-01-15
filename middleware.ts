import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const loginPage = '/';
  const megaPage = '/mega';

  const url = req.nextUrl.clone();
  const token = req.cookies.get('gradap21-token')?.value;
  
  // /mega 페이지에 접근 시 쿠키가 없으면 리다이렉트
  if (url.pathname.startsWith(megaPage) && !token) {
    url.pathname = loginPage;
    return NextResponse.redirect(url);
  }

  // 다른 요청은 그대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/mega/:path*'], // /mega 경로와 하위 경로에만 미들웨어 적용
};
