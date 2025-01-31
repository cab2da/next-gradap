// // app/api/utils/connect.ts 파일
// import { ExcuteStoredProcedure } from './db';

// // export async function handlerQuery(req: any, res: any) {
// //     const { query } = req.query; // 쿼리문을 요청에서 받아옵니다
// //     try {
// //         // console.log("query", query)

// //         const result = await ExcuteQuery(query); // 받아온 쿼리문을 실행합니다
// //         if (result) {

// //             // console.log("result", result)
// //             res.status(200).json(result);
// //         } else {
// //             res.status(500).json({ error: "No result returned" });
// //         }
// //     } catch (error) {
// //         console.error("Query Execution Error:", error);
// //         res.status(500).json({ error: "Query execution failed" });
// //     }
// // }

// export default async function handlerSP(req: any, res: any) {
//     const { query } = req.query; // 저장 프로시저 이름을 요청에서 받아옵니다
//     const params = req.body; // 저장 프로시저 인수를 본문에서 받아옵니다
//     try {
//         // console.log("query", query)
//         // console.log("params", params)

//         const result = await ExcuteStoredProcedure(query, params);
//         if (result) {
//             // console.log("result", result)
//             res.status(200).json(result);
//         } else {
//             res.status(500).json({ error: "Stored procedure returned no result" });
//         }
//     } catch (error) {
//         // console.error("Stored Procedure Execution Error:", error);
//         res.status(500).json({ error: "Stored procedure execution failed" });
//     }
// }
