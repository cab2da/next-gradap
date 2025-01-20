
"use client";

import Loading from '@/app/loading';

import { addWeeks, startOfWeek, endOfWeek, getISOWeek } from 'date-fns';
import { useContext, useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { UserSubContext  } from '@/context/UserSubContext'

interface Content {
    날짜: string;
    시작일: string;
    종료일: string;
    보고서다운로드: number;
    메모: number;
    상급자조언코칭: number;
    전문가조언코칭: number;
    상급자조언요청: number;
    전문가조언요청: number;
    상급자코칭: number;
    전문가코칭: number;
}

const WeeklyDashboard = () => {
    const [dataResult, setDataResult] = useState<Content[]>([]);
    
    // 오늘 날짜 기준으로 시작
    const [currentDate, setCurrentDate] = useState(new Date());

    // 주간 범위와 주차 번호를 계산하는 함수
    const getWeekRange = (date: Date) => {
      // ISO 8601 기준으로 주간 시작일과 종료일 계산
      const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 0 }); // 월요일 시작
      const endOfCurrentWeek = endOfWeek(date, { weekStartsOn: 0 });

      // 날짜 형식화 (ex. 11월 3일, 11월 9일)
      const formatDate = (date: Date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

      // 주간 범위 및 주차 번호
      return {
        weekRange: `${formatDate(startOfCurrentWeek)} ~ ${formatDate(endOfCurrentWeek)}`,
        weekNumber: `${getISOWeek(date)}주차`,
      };
    };
    // 현재 주차 정보 가져오기
    const { weekRange, weekNumber } = getWeekRange(currentDate);

    // 이전 주차로 이동
    const handlePreviousWeek = () => {
      setCurrentDate(prevDate => addWeeks(prevDate, -1));
    };

    // 다음 주차로 이동
    const handleNextWeek = () => {
      setCurrentDate(prevDate => addWeeks(prevDate, 1));
    };

    const contextUserSub = useContext(UserSubContext);
    if (!contextUserSub) {
        throw new Error('userInfo must be used within a SelectedLawdCodeContext.Provider');
    }
    const { userSub, setUserSub } = contextUserSub;
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

                const storedProcName = "GD_USER_STATS_SELECT";
                const params = {
                    SelType: '주간',
                    InsDate: nowDate,
                    UserId: userSub?.userID,
                };
        
                const res = await fetch(`/api/connect?query=${storedProcName}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params),
                });
                const sqlData = await res.json();
                const result = sqlData[0]
                setDataResult(result); // 전체 결과를 상태로 설정합니다

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        if (userSub) {
            fetchData();
        }

    }, [currentDate]);

    if (isLoading) {
        return <Loading />;
    }
    else {
    return (
        <div className='bg-white p-4 rounded-md'>
            <div className="flex flex-row items-center gap-2">
              <button onClick={handlePreviousWeek}>
                <FaArrowCircleLeft color='#4738a2' />
              </button>
              <p className="text-sm font-bold text-neutral-800">{weekRange}({weekNumber})</p>
              <button onClick={handleNextWeek}>
                <FaArrowCircleRight color='#4738a2' />
              </button>
            </div>
            {dataResult && dataResult.length > 0 ? (
                dataResult.map((item, index) => (
                    <div key={index} >

                        {/* 기업보고서 */}
                        <h1 className="font-bold text-gray-700 border-b-[2px] mt-4 mb-1 ">기업보고서</h1>                                
                        
                        <div className="flex flex-row justify-between border-b-[1px] p-2 text-[#6c757d]">
                            <span className="text-sm">기업 진단보고서 다운로드</span>
                            <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.보고서다운로드}건</span>
                        </div>

                        <div className="flex flex-row justify-between border-b-[2px] p-2 text-[#6c757d]">
                            <span className="text-sm">메모</span>
                            <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.메모}건</span>
                        </div>


                        {/* 조언요청 */}
                        <h1 className="font-bold text-gray-700  border-b-[2px] mt-6 mb-1 ">조언요청</h1>

                        <div className="flex flex-row justify-between border-b-[1px] p-2 text-[#6c757d]">
                            <span className="text-sm">상급자 일반 조언요청</span>
                            <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.상급자조언코칭}건</span>
                        </div>

                        <div className="flex flex-row justify-between border-b-[1px] p-2 text-[#6c757d]">
                            <span className="text-sm">전문가 일반 조언요청</span>
                            <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.전문가조언코칭}건</span>
                        </div>

                        <div className="flex flex-row justify-between border-b-[1px] p-2 text-[#6c757d]">
                            <span className="text-sm">상급자 기업 조언요청</span>
                            <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.상급자조언요청}건</span>
                        </div>

                        <div className="flex flex-row justify-between border-b-[1px] p-2 text-[#6c757d]">
                            <span className="text-sm">전문가 기업 조언요청</span>
                            <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.전문가조언요청}건</span>
                        </div>

                        <div className="flex flex-row justify-between border-b-[1px] p-2 text-[#6c757d]">
                            <span className="text-sm">상급자 코칭</span>
                            <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.상급자코칭}건</span>
                        </div>

                        <div className="flex flex-row justify-between border-b-[2px] p-2 text-[#6c757d]">
                            <span className="text-sm">전문가  코칭</span>
                            <span className="flex justify-end pr-2 text-sm text-[#6c757d]">{item.전문가코칭}건</span>
                        </div>

                    </div>

                    
                ))
                ) : (
                    <p className="pt-4">데이터가 없습니다.</p>
                )}
            
        </div>
    );
}
}

export default WeeklyDashboard;
