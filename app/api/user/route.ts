import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SESSION_SECRET || '';

export async function GET(req: NextRequest) {
  // 쿠키에서 토큰 가져오기
  const tokenCookie  = req.cookies.get('gradap21-token');
  const token = tokenCookie?.value; // 실제 토큰 값 가져오기
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // JWT 검증 및 디코딩
    const decoded = jwt.verify(token, SECRET_KEY);

    // 디코딩된 사용자 정보 반환
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
