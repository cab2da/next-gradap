// app/api/login/route.ts

import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SESSION_SECRET
// const encodedKey = new TextEncoder().encode(SECRET_KEY)

export async function POST(req: Request) {

  

  // 토큰 생성
  // const token = 'secure_token_wlstjtkfkd';

  try {
    // 1. 요청에서 이메일 및 비밀번호 추출
    const response = await req.json()
    const userID = response.params.userID
    const password = response.params.password

    // 2. 요청할 SQL 스토어드 프로시저 및 매개변수
    const storedProcName = "GD_Login_S";
    const params = { userID, password }
  
    // 3. fetch로 /api/connect에 POST 요청 (query string + body 데이터)
    // 현재 요청의 전체 URL을 가져옵니다.
    const url = new URL(req.url);
    const baseUrl = url.origin;
    const res = await fetch(`${baseUrl}/api/connect?query=${storedProcName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });

    const sqlData = await res.json();
    const result = sqlData && Array.isArray(sqlData) && sqlData.length > 0 ? sqlData[0] : null

    // 4. SQL 쿼리 결과에 따른 로직 처리
    if (result) {    

      if (result[0].result === '성공')
      {
        // JWT 토큰 생성 (유저 정보 포함)
        const token = jwt.sign(
          // 유저 정보
          { userID: userID,
            userName: result[0].user_name, 
            userDepart: result[0].user_depart, 
            userLevel: result[0].user_level,
          }, 
          SECRET_KEY || '', // 서명 키
          { expiresIn: '1d' } // 토큰 만료 시간
        );

        // 토큰을 HttpOnly 쿠키에 저장
        const response = NextResponse.json({ 
          success: true,
          message: "로그인 성공",
          result, // result 포함
        })
        response.cookies.set('gradap21-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24, // 1일
        });
        return response
  
      } else {
        // 로그인 실패 시 쿠키 제거
        const response = NextResponse.json({ 
          success: false, 
          message: '로그인 실패',
          result, 
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
