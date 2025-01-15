"use client";

import Loading from "@/app/loading";
import StateCard from "@/components/StateCard";
import { useEffect, useState } from "react";

interface DataResult {
    PossibleCount?: number;
    TotalCount?: number;
    [key: string]: any; // Add any other possible keys in the object
}

const StatelyCInfo = () => {
    const [dataResult, setDataResult] = useState<DataResult[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedProcName = "GD_REPORT_Now";
                const params = {};

                const res = await fetch(`/api/connect?query=${storedProcName}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params),
                });
                const sqlData = await res.json();
                setDataResult(sqlData); // 전체 결과를 상태로 설정합니다

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
        setRefresh(false);
    }, [refresh]);

    const handleCretop = async () => {
        if (isProcessing) return; // 이미 요청 중이면 함수 종료

        setIsProcessing(true);

        try {
            // const storedProcName = "GD_REPORT_Now";
            const storedProcName = "GD_SP_ID_Update";
            const params = {};

            const res = await fetch(`/api/connect?query=${storedProcName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            // console.log('Stored procedure result:', data);

            setRefresh(true);   // 새로고침 용도
        } catch (error) {
            console.error('Error executing stored procedure:', error);
        } finally {
            setIsProcessing(false); // 요청 완료 후 플래그 리셋
        }
    };

    const handleMssql = async () => {
        try {
            const storedProcName = "GD_DATABASE_SHRINK";

            const res = await fetch(`/api/connect?query=${storedProcName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log('Stored procedure result:', data);

            setRefresh(true);   // 새로고침 용도
        } catch (error) {
            console.error('Error executing stored procedure:', error);
        }
    };

    return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 pt-4 pb-20 gap-4 bg-gray-50'>
                {dataResult.length > 0 ? (
                    <>
                        <StateCard
                            title="크레탑"
                            description="크레탑 아이디의 상태를 제공합니다."
                            txt1={`등록된 ID : ${dataResult[0]?.[0]?.TotalCount ?? 0} 개`}
                            txt2={`사용 가능 ID : ${dataResult[0]?.[0]?.PossibleCount ?? 0} 개`}
                            buttons={[
                                { label: '임시조치', onClick: () => handleCretop() },
                            ]}
                        />
                        
                        <StateCard
                            title="database - MS SQL"
                            description="데이터베이스의 상태를 제공합니다."
                            txt1={`DB 할당량 : 600 MB`}
                            txt2={`DB 사용량 : ${dataResult[3]?.[0]?.TABLE_SIZE ?? ''} MB`}
                            buttons={[
                                { label: '임시조치', onClick: () => handleMssql() },
                            ]} />
                        
                        <StateCard
                            title="보고서 생성 대기"
                            description="보고서 생성을 요청하고 대기 중인 건수를 제공합니다."
                            txt1={`대기 건수 : ${dataResult[1]?.Lenth ?? 0} 건`}
                            txt2='' />
                    </>
                ):(
                    <Loading />
                )}
            </div>
       
    );
}

export default StatelyCInfo;
