
"use client";

import { useEffect, useState  } from "react";
import YearlyChart from "@/components/Dashboard/YearlyChart";
import Loading from "@/app/loading";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface Content {
    날짜: string;
    시작일: string;
    종료일: string;
    보고서다운로드: number;
    보고서다운로드증감율: number;
    메모: number;
    메모증감율: number;
    상급자조언코칭: number;
    상급자조언코칭증감율: number;
    전문가조언코칭: number;
    전문가조언코칭증감율: number;
    상급자조언요청: number;
    상급자조언요청증감율: number;
    전문가조언요청: number;
    전문가조언요청증감율: number;
    상급자코칭: number;
    상급자코칭증감율: number;
    전문가코칭: number;
    전문가코칭증감율: number;
}

const YearlyDashboard = () => {
    const [dataResult, setDataResult] = useState<Content[]>([]);
    const [prevYearRange, setPrevYearRange] = useState<string>("");

    // 초기 연도를 현재 연도로 설정
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState('');

    // 연도를 1년 감소시키는 함수
    const handlePreviousYear = () => {
        setCurrentYear((prevYear) => prevYear - 1);
    };

    // 연도를 1년 증가시키는 함수
    const handleNextYear = () => {
        setCurrentYear((prevYear) => prevYear + 1);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {  

                const prevyear = currentYear - 1; 
                setPrevYearRange(`${prevyear}년 ~ ${currentYear}년 대비`);

                const today = new Date();
                const year = currentYear;
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const nowDate = `${year}-${month}-${day}`;
                setCurrentDate(nowDate)

                const storedProcName = "GD_USER_STATS_SELECT";
                const params = {
                    SelType: '년간',
                    InsDate: nowDate,
                    UserId: 'MEGA4143',
                };
        
                const res = await fetch(`/api/connect?query=${storedProcName}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params),
                });
                const sqlData = await res.json();
                setDataResult(sqlData[0]); // 전체 결과를 상태로 설정합니다

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [currentYear]);

    return (
        <div className='bg-white p-4 rounded-md'>
            <div className="flex flex-col justify-start">

                <div className="flex flex-row items-center gap-1">
                <button onClick={handlePreviousYear}>
                    <FaArrowCircleLeft color='#4738a2' />
                </button>
                <p className="text-sm font-bold text-neutral-800">{currentYear}년</p>
                <button onClick={handleNextYear}>
                    <FaArrowCircleRight color='#4738a2' />
                </button>
                </div>

                {dataResult.length > 0 ? (
                    <YearlyChart currentDate={currentDate} />
                ) : (
                    <p></p>
                )}
                
                
                {dataResult.length > 0 ? (
                    dataResult.map((item, index) => (
                        <div key={index} >

                            {/* 기업보고서 */}
                            <h1 className="font-bold text-gray-700 mt-4 mb-1 ">기업보고서</h1>                                
                            <p className="text-sm text-[#6c757d] border-b-[2px] pb-2">{prevYearRange}</p>

                            <div className="flex flex-row justify-between border-b-[1px] p-2">
                                <div className="flex items-center text-[#6c757d]">
                                    <span className="text-sm">기업 진단보고서 다운로드</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.보고서다운로드}건</span>
                                    <span className="flex justify-end pr-2 text-sm text-[#adb5bd]">{item.보고서다운로드증감율}%</span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between border-b-[1px] p-2">
                                <div className="flex items-center text-[#6c757d]">
                                    <span className="text-sm">메모</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.메모}건</span>
                                    <span className="flex justify-end pr-2 text-sm text-[#adb5bd]">{item.메모증감율}%</span>
                                </div>
                            </div>


                            {/* 조언요청 */}
                            <h1 className="font-bold text-gray-700  mt-6 mb-1 ">조언요청</h1>
                                
                            <p className="text-sm text-[#6c757d] border-b-[2px] pb-2">{prevYearRange}</p>

                            <div className="flex flex-row justify-between border-b-[1px] p-2">
                                <div className="flex items-center text-[#6c757d]">
                                    <span className="text-sm">상급자 일반 조언요청</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.상급자조언코칭}건</span>
                                    <span className="flex justify-end pr-2 text-sm text-[#adb5bd]">{item.상급자조언코칭증감율}%</span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between border-b-[1px] p-2">
                                <div className="flex items-center text-[#6c757d]">
                                    <span className="text-sm">전문가 일반 조언요청</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.전문가조언코칭}건</span>
                                    <span className="flex justify-end pr-2 text-sm text-[#adb5bd]">{item.전문가조언코칭증감율}%</span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between border-b-[1px] p-2">
                                <div className="flex items-center text-[#6c757d]">
                                    <span className="text-sm">상급자 기업 조언요청</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.상급자조언요청}건</span>
                                    <span className="flex justify-end pr-2 text-sm text-[#adb5bd]">{item.상급자조언요청증감율}%</span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between border-b-[1px] p-2">
                                <div className="flex items-center text-[#6c757d]">
                                    <span className="text-sm">전문가 기업 조언요청</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.전문가조언요청}건</span>
                                    <span className="flex justify-end pr-2 text-sm text-[#adb5bd]">{item.전문가조언요청증감율}%</span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between border-b-[1px] p-2">
                                <div className="flex items-center text-[#6c757d]">
                                    <span className="text-sm">상급자 코칭</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.상급자코칭}건</span>
                                    <span className="flex justify-end pr-2 text-sm text-[#adb5bd]">{item.상급자코칭증감율}%</span>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between border-b-[2px] p-2">
                                <div className="flex items-center text-[#6c757d]">
                                    <span className="text-sm">전문가  코칭</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.전문가코칭}건</span>
                                    <span className="flex justify-end pr-2 text-sm text-[#adb5bd]">{item.전문가코칭증감율}%</span>
                                </div>
                            </div>

                        </div>

                        
                    ))
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}

export default YearlyDashboard;
