"use client"

import React, { useEffect, useMemo, useState, useRef, useContext } from 'react';
import UserData  from '@/components/UserData'; 
import { UserSubContext } from '@/context/UserSubContext'

import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';

import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AlertDialogDemo } from '@/components/Alert-dialog';
import CustomButtonComponent from '@/components/CustomButtonComponent ';
import UserInfoCard from '@/components/UserInfoCard';
import { useRouter } from 'next/navigation';

interface DataResult {
    user_id: string;
    user_name: string;
    user_position: string;
    user_depart: string;
    user_superior: string;
    Depth: number;
}

function DashboardPage() {
    const router = useRouter();
    const { user, error } = UserData(); 

    const [dataResult, setDataResult] = useState<DataResult[]>([]);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [desc, setDesc ] = useState('');

    // 선택한 유저 정보
    const contextUserSub = useContext(UserSubContext);
    if (!contextUserSub) {
        throw new Error('userInfo must be used within a SelectedLawdCodeContext.Provider');
    }
    const { userSub, setUserSub } = contextUserSub;


    useEffect(() => {
        // 유저가 존재하는 경우에만 데이터 가져오기
        if (!user) return;

      const fetchData = async () => {
        try {
            setIsLoading(true); // 로딩 시작
            
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const nowDate = `${year}-${month}-${day}`;

            const storedProcName = "GD_USER_STATS_SELECT";
            const params = {
                SelType: '목록',
                InsDate: nowDate,
                UserId: user.userID,
            };

            const res = await fetch(`/api/connect?query=${storedProcName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            const sqlData = await res.json();
            setDataResult(sqlData[0]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
      };

    fetchData();
    }, [user]); 

    const ColumnDefs = useMemo<ColDef[]>(
        () => [
          { field: "user_id", headerName: "유저ID", tooltipField: "user_id", minWidth: 100, maxWidth: 100, cellClass: 'custom-cell' },
          { field: "user_name", headerName: "성명", tooltipField: "user_name", minWidth: 76, maxWidth: 76, cellClass: 'custom-cell' },
          { field: "user_position", headerName: "직책", tooltipField: "user_position", minWidth: 76, maxWidth: 76, cellClass: 'custom-cell' },
          { field: "user_depart", headerName: "부서", tooltipField: "user_depart", cellClass: 'custom-cell' },
          {
            field: "actions",
            headerName: "보기",
            minWidth: 80,
            maxWidth: 80,
            cellClass: 'custom-cell',
            cellRenderer: CustomButtonComponent, // 컴포넌트를 그대로 참조
            
          },
        ], [] // 의존성 배열이 비어 있으므로 초기화 시 한 번만 생성
      );

    const defaultColDef = useMemo( ()=> {
        return {
            flex: 1,
            resizable: true,
            sortable: true,
            minWidth: 80,
            filter: true,
        }
    }, []);

    // Ag Grid 셀 클릭 이벤트
    const onCellClicked = (params: any) => {
        if (params.colDef.field != "actions") {
            setIsDialogOpen(true);
            setDesc(`${params.value}`);
        }
      };

    //  나의 활동량 분석 버튼 클릭
    const handleMyReport = () => {
        const userInfo = {
            userID: user?.userID ?? '',
            userName: user?.userName ?? '',
            userDepart: user?.userDepart ?? '',
            userLevel: user?.userLevel ?? '',
        };

        setUserSub(userInfo);
        router.push('/mega/Dashboard/reportDetail/Weekly'); // 클라이언트 환경에서만 이동
    };

    if (isLoading) {
        return <Loading />;
    }
    else {

  return (
    <div className='flex flex-col w-full h-full'>
        {/* 상단 섹션 */}
        <div className="flex flex-col p-4 gap-2 bg-[#F4F4FA]">
            <div>
                <UserInfoCard />
            </div>
            <Button variant='outline'
                className="flex w-full text-[14px] border-[#4738a2]"
                onClick={handleMyReport}
            >
                나의 활동량 분석
            </Button>
        </div>

        {/* 하단 구성원 리스트 */}
        <div className='mt-4 p-4 h-full max-h-[calc(100%-111px)]'>
            <p className="text-[14px] pl-4 pb-2">구성원의 활동량 보기</p>

            {dataResult && dataResult.length > 0 ? (
                <div className="ag-theme-alpine h-full max-h-[calc(100%-111px)] pb-6" style={{ fontSize:'12px', width: '100%', height: '483px' } }>
                    <AgGridReact
                        rowData={dataResult} 
                        rowHeight={36}
                        columnDefs={ColumnDefs} 
                        defaultColDef={defaultColDef}
                        tooltipShowDelay={0} //툴팁 바로 표시
                        onCellClicked={onCellClicked} // 클릭 이벤트 핸들러    
                        immutableData={true} // 데이터가 변경된 경우에만 렌더링

                        pagination={true}
                        paginationPageSize={10}
                        suppressAggFuncInHeader={true}// 헤더 고정시키기
                        paginationAutoPageSize={true}
                        suppressPaginationPanel={false}

                        // domLayout="autoHeight"
                        localeText={{noRowsToShow: '조회 결과가 없습니다.'}}
                    />
                </div>
            ) : (
                <p className="pt-4">데이터가 없습니다.</p>
            )}

            {isDialogOpen && (
                <AlertDialogDemo 
                    isOpen={isDialogOpen} 
                    title="상세정보"  content = {desc} 
                    onClose={() => setIsDialogOpen(false)} 
                />
            )}

        </div>
    </div>
  );
};
}

export default DashboardPage;
