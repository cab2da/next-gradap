
"use client";

import { useEffect, useState, useContext  } from "react";
import { UserContext  } from '@/context/UserContext'
import { format, addMonths, subMonths } from "date-fns";
import MonthlyChart from "@/components/Dashboard/MonthlyChart";
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

const MonthlyDashboard = () => {
    const [dataResult, setDataResult] = useState<Content[]>([]);
    const [prevMonthRange, setPrevMonthRange] = useState<string>("");

    // 오늘 날짜를 기준으로 현재 월을 초기 설정
    const [currentDate, setCurrentDate] = useState(new Date());

    // 월을 한 달 이전으로 변경하는 함수
    const handlePreviousMonth = () => {
        setCurrentDate((prevDate) => subMonths(prevDate, 1));
    };

    // 월을 한 달 이후로 변경하는 함수
    const handleNextMonth = () => {
        setCurrentDate((prevDate) => addMonths(prevDate, 1));
    };
    
    const contextUser = useContext(UserContext);
    if (!contextUser) {
        throw new Error('userInfo must be used within a SelectedLawdCodeContext.Provider');
    }
    const { user, setUser } = contextUser;
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 

    useEffect(() => {
        const fetchData = async () => {
            try {  
                setIsLoading(true); // 로딩 시작

                const today = currentDate;
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const nowDate = `${year}-${month}-${day}`;

                const prevMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1; // 전월 (0월인 경우 12월로 설정)
                const prevyear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear(); // 1월인 경우 전년도 설정
                // 전월 1일과 전월 말일 구하기
                const firstDayOfPrevMonth = new Date(year, prevMonth, 1);
                const lastDayOfPrevMonth = new Date(year, prevMonth + 1, 0);

                // 날짜를 'YYYY년 MM월 DD일' 형식으로 변환
                const formatDate = (date: Date) => {
                    const y = date.getFullYear();
                    const m = String(date.getMonth() + 1).padStart(2, "0");
                    const d = String(date.getDate()).padStart(2, "0");
                    return `${y}년 ${m}월 ${d}일`;
                };
                setPrevMonthRange(`${formatDate(firstDayOfPrevMonth)} ~ ${formatDate(lastDayOfPrevMonth)} 대비`);

                const storedProcName = "GD_USER_STATS_SELECT";
                const params = {
                    SelType: '월간',
                    InsDate: nowDate,
                    UserId: user?.userID,
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
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        fetchData();
    }, [currentDate]);

    if (isLoading) {
        return <Loading />;
      }

    return (
        <div className='bg-white p-4 rounded-md'>
            <div className="flex flex-col justify-start">

            <div className="flex flex-row items-center gap-1">
              <button onClick={handlePreviousMonth}>
                <FaArrowCircleLeft color='#4738a2' />
              </button>
              <p className="text-sm font-bold text-neutral-800">{format(currentDate, "yyyy년 MM월")}</p>
              <button onClick={handleNextMonth}>
                <FaArrowCircleRight color='#4738a2' />
              </button>
            </div>
                {dataResult.length > 0 ? (
                    <MonthlyChart currentDate={currentDate} />
                ) : (
                    <p></p>
                )}

                {dataResult.length > 0 ? (
                    dataResult.map((item, index) => (
                        <div key={index} >

                            {/* 기업보고서 */}
                            <h1 className="font-bold text-gray-700 mt-4 mb-1 ">기업보고서</h1>                                
                            <p className="text-sm text-[#6c757d] border-b-[2px] pb-2">{prevMonthRange}</p>

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
                                
                            <p className="text-sm text-[#6c757d] border-b-[2px] pb-2">{prevMonthRange}</p>

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
                    <div></div>
                )}
            </div>
        </div>
    );
}

export default MonthlyDashboard;
