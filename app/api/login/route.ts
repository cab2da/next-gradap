// app/api/login/route.ts

import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

const SERVERURL = process.env.NEXT_PUBLIC_API_SERVERURL;
const SECRET_KEY = process.env.SESSION_SECRET

export async function POST(req: Request) {
  try {

    const { params } = await req.json();
    const { userID, password } = params;

    const API_URL = `${SERVERURL}/gradap/login?userID=${userID}&password=${password}`;

    const res = await fetch(API_URL);
    const response = await res.json();
    const { result, user_name, user_depart, user_level } = response[0];
    const user = response[0];

    // 결과 처리
    if (result === '성공') {
      const token = jwt.sign(
        {
          userID,
          userName: user.user_name,
          userDepart: user.user_depart,
          userLevel: user.user_level,
        },
        SECRET_KEY || '',
        { expiresIn: '1d' }
      );

      const response = NextResponse.json({
        success: true,
        message: '로그인 성공',
        result: user,
      });

      response.cookies.set('gradap21-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    return NextResponse.json({
      success: false,
      message: '로그인 실패',
    });
  } catch (error) {
    // 오류 발생 시 쿠키 제거
    console.error('Login error:', error)
    const response = NextResponse.json({
      success: false,
      message: "서버 에러가 발생했습니다.",
    })
    response.cookies.set('gradap21-token', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    })  // 쿠키 삭제
    return response
  }
}
