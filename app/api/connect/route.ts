// // app/api/connect/route.ts 파일
// import { NextRequest, NextResponse } from 'next/server';
// import { ExcuteStoredProcedure } from '../utils/db';

// export async function POST(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get('query'); // 저장 프로시저 이름을 URL에서 가져옵니다
//     const params = await req.json(); // 저장 프로시저 인수를 본문에서 가져옵니다

//     try {
//         const result = await ExcuteStoredProcedure(query || '', params);
//         if (result) {
//             return NextResponse.json(result);
//         } else {
//             return NextResponse.json({ error: "Stored procedure returned no result" }, { status: 500 });
//         }
//     } catch (error) {
//         console.error("Stored Procedure Execution Error:", error);
//         return NextResponse.json({ error: "Stored procedure execution failed" }, { status: 500 });
//     }
// }
