import React, { useEffect, useState, useContext } from "react";
import { UserSubContext } from '@/context/UserSubContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Content {
    날짜: string;
    보고서다운로드증감율: number;
    메모증감율: number;
    상급자조언코칭증감율: number;
    전문가조언코칭증감율: number;
    상급자조언요청증감율: number;
    전문가조언요청증감율: number;
    상급자코칭증감율: number;
    전문가코칭증감율: number;
}
interface YearlyChartProps {
    currentDate: string;
}

const YearlyChart = ({ currentDate }: YearlyChartProps) => {
    const [dataResult, setDataResult] = useState<Content[]>([]);
    const contextUserSub = useContext(UserSubContext);
    if (!contextUserSub) {
        throw new Error('userInfo must be used within a SelectedLawdCodeContext.Provider');
    }
    const { userSub, setUserSub } = contextUserSub;

    const SERVERURL = process.env.NEXT_PUBLIC_API_SERVERURL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date(currentDate);
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const nowDate = `${year}-${month}-${day}`;

                const API_URL = `${SERVERURL}/gradap/dashboard/yearly?SelType=차트_년&InsDate=${currentDate}&UserId=${userSub?.userID}`;

                const res = await fetch(API_URL);
                const response = await res.json();

                setDataResult(response);


                // const res = await fetch('/api/connect?query=GD_USER_STATS_SELECT', {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json",
                //         Connection: 'keep-alive', // 연결 유지
                //      },
                //     body: JSON.stringify({
                //         SelType: '차트_년',
                //         InsDate: currentDate,
                //         UserId: userSub?.userID,
                //     }),
                // });
                // const sqlData = await res.json();
                // setDataResult(sqlData[0]);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (userSub) {
            fetchData();
        }
    }, [currentDate]);

    return (
        <div className="bg-white rounded-xl w-full h-full p-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={dataResult}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false} // 세로 눈금선 숨기기
                    />
                    <XAxis
                        dataKey="날짜"
                        axisLine={true}
                        tick={{ fill: "#0a0b0b", fontSize: 12 }}
                        tickLine={true}
                        tickMargin={6}
                        // interval="preserveStartEnd" 
                        // scale="point" 
                        angle={-45} textAnchor="end"
                        padding={{ left: 20, right: 20 }}
                    />
                    <YAxis
                        tick={{ fill: "#0a0b0b", fontSize: 14 }}
                        tickFormatter={(value) => `${value}%`}
                        tickMargin={10}
                        tickLine={false}
                        axisLine={true}

                    />

                    {/* <Tooltip /> */}
                    <Tooltip
                        contentStyle={{ fontSize: '14px', backgroundColor: '#fff', border: '1px solid #ddd' }}
                        itemStyle={{ fontSize: '14px' }}
                    />

                    <Line type="monotone" dataKey="보고서다운로드증감율" stroke="#d1a1d1" strokeWidth={1}
                        dot={{
                            stroke: '#d1a1d1',   // 점 색상
                            strokeWidth: 6,       // 점 선 두께
                            r: 3,                 // 점의 크기 (반지름)
                        }}
                        name='보고서' legendType="square" />
                    <Line type="monotone" dataKey="메모증감율" stroke="#eeacc5" strokeWidth={3}
                        dot={{
                            stroke: '#eeacc5',   // 점 색상
                            strokeWidth: 6,       // 점 선 두께
                            r: 3,                 // 점의 크기 (반지름)
                        }}
                        name='메모' legendType="square" />
                    <Line type="monotone" dataKey="상급자조언코칭증감율" stroke="#7b5685" strokeWidth={1}
                        dot={{
                            stroke: '#7b5685',   // 점 색상
                            strokeWidth: 6,       // 점 선 두께
                            r: 3,                 // 점의 크기 (반지름)
                        }}
                        name='상급자 조언코칭' legendType="square" />
                    <Line type="monotone" dataKey="전문가조언코칭증감율" stroke="#7e7cad" strokeWidth={1}
                        dot={{
                            stroke: '#7e7cad',   // 점 색상
                            strokeWidth: 6,       // 점 선 두께
                            r: 3,                 // 점의 크기 (반지름)
                        }}
                        name='전무가 조언코칭' legendType="square" />
                    <Line type="monotone" dataKey="상급자조언요청증감율" stroke="#a13d73" strokeWidth={1}
                        dot={{
                            stroke: '#a13d73',   // 점 색상
                            strokeWidth: 6,       // 점 선 두께
                            r: 3,                 // 점의 크기 (반지름)
                        }}
                        name='상급자 조언요청' legendType="square" />
                    <Line type="monotone" dataKey="전문가조언요청증감율" stroke="#5b41ab" strokeWidth={1}
                        dot={{
                            stroke: '#5b41ab',   // 점 색상
                            strokeWidth: 6,       // 점 선 두께
                            r: 3,                 // 점의 크기 (반지름)
                        }}
                        name='전문가 조언요청' legendType="square" />
                    <Line type="monotone" dataKey="상급자코칭증감율" stroke="#e287e2" strokeWidth={1}
                        dot={{
                            stroke: '#e287e2',   // 점 색상
                            strokeWidth: 6,       // 점 선 두께
                            r: 3,                 // 점의 크기 (반지름)
                        }}
                        name='상급자 코칭' legendType="square" />
                    <Line type="monotone" dataKey="전문가코칭증감율" stroke="#689cc1" strokeWidth={1}
                        dot={{
                            stroke: '#689cc1',   // 점 색상
                            strokeWidth: 6,       // 점 선 두께
                            r: 3,                 // 점의 크기 (반지름)
                        }}
                        name='전문가 코칭' legendType="square" />

                    <Legend
                        align="left"
                        verticalAlign='bottom'
                        wrapperStyle={{
                            paddingTop: "20px",
                            paddingBottom: "30px",
                            paddingLeft: "18px",   // 좌측 여백
                            paddingRight: "10px",  // 우측 여백
                            display: "flex", // flex 사용
                            justifyContent: "center", // 중앙 정렬
                        }}
                        iconSize={14} // 아이콘 크기 조절
                        layout="horizontal"

                        // 각 항목에 대해 스타일을 적용할 수 있음
                        content={(props) => {
                            const { payload } = props;
                            if (!payload) {
                                return null; // `payload`가 없으면 아무것도 렌더링하지 않음
                            }
                            return (
                                <ul style={{
                                    display: 'flex',
                                    flexWrap: 'wrap', // 항목이 넘치면 다음 줄로 넘어갑니다
                                    justifyContent: 'start',
                                    margin: 0,
                                    padding: 0
                                }}>
                                    {payload.map((entry, index) => (
                                        <li
                                            key={`legend-item-${index}`}
                                            className="flex flex-row justify-start items-center text-xs"
                                            style={{
                                                margin: '5px 10px',
                                                listStyleType: 'none',
                                                flexBasis: 'calc(33.33% - 20px)', // 한 행에 3개씩 표시되도록 설정
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    width: '12px',
                                                    height: '12px',
                                                    backgroundColor: entry.color,
                                                    marginRight: '5px',
                                                }}
                                            />
                                            {entry.value}
                                        </li>
                                    ))}
                                </ul>
                            );
                        }}

                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default YearlyChart;
