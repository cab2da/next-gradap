import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
 
  // 쿠키 삭제
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('gradap21-token', '', { maxAge: 0, path: '/' });

  return response;
}
