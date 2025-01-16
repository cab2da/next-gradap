"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MdPushPin } from "react-icons/md";
import Loading from "@/app/loading";
import { AlertDialogDemo } from "@/components/Alert-dialog";


interface DataResultReport {
    _date: Date;
    created_id: string;
    user_name: string;
    enpNm: string;
}

interface DataResultCratop {
    sp_id: string;
    user_name: string;
    sp_YN: string;
    sp_reason: string;
}

const StatelyDetail = () => {
    const [dataResultCratop, setDataResultCratop] = useState<DataResultCratop[]>([]);
    const [dataResultReport, setDataResultReport] = useState<DataResultReport[]>([]);
    const [dataResultReportBefore, setDataResultReportBefore] = useState<DataResultReport[]>([]);

    const [refresh, setRefresh] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [desc, setDesc ] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // 로딩 시작

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

                setDataResultCratop(sqlData[4]);    // 크레탑
                setDataResultReport(sqlData[1]);    // 보고서 생성 대기
                setDataResultReportBefore(sqlData[2]);    // 직전 보고서 생성 현황

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        fetchData();
        setRefresh(false);
    }, [refresh]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);

        // Adjust to local time
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

        const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
        const day = localDate.getDate().toString().padStart(2, '0');
        const hours = localDate.getHours().toString().padStart(2, '0');
        const minutes = localDate.getMinutes().toString().padStart(2, '0');
        const seconds = localDate.getSeconds().toString().padStart(2, '0');

        return `${month}/${day} ${hours}:${minutes}`;
    };


    // 크레탑 컬럼 정보
    const [CratopColumnDefs] = useState<ColDef[]>([
        { field: "sp_id", headerName: "ID", tooltipField: "sp_id", minWidth: 96, maxWidth: 96, cellClass: 'custom-cell' },
        { field: "user_name", headerName: "성명", tooltipField: "user_name", minWidth: 76, maxWidth: 76, cellClass: 'custom-cell'},
        { field: "sp_YN", headerName: "사용유무", minWidth: 100, maxWidth: 100, cellClass: 'custom-cell',
            cellStyle: params => {
                if (params.value === '사용불가') {
                    return {color: 'red'};
                }
                return {color: 'blue'};
            }
        },
        { field: "sp_reason", headerName: "비고", tooltipField: "sp_reason", cellClass: 'custom-cell'},
    ]);

    // 보고서 컬럼 정보
    const [ReportColumnDefs] = useState<ColDef[]>([
        { field: "_date", headerName: "생성일시", tooltipField: "_date", minWidth: 100, maxWidth: 100, cellClass: 'custom-cell', 
            cellRenderer: (params: any) => {                
                return params? formatDate(params.value) : '';
            }
        },
        { field: "created_id", headerName: "생성ID", tooltipField: "created_id", minWidth: 96, maxWidth: 96, cellClass: 'custom-cell' },
        { field: "user_name", headerName: "성명", tooltipField: "user_name", minWidth: 76, maxWidth: 76, cellClass: 'custom-cell'},
        { field: "enpNm", headerName: "회사", tooltipField: "enpNm", cellClass: 'custom-cell'},
    ]);

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
        if (params.colDef.field === "sp_reason" || params.colDef.field === "user_name" || params.colDef.field === "enpNm") {

            setIsDialogOpen(true);
            setDesc(`${params.value}`);
        }
      };


    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className='px-2 pt-6 pb-20 w-full h-full'>
            {dataResultCratop.length > 0 ? (
                <Tabs defaultValue="cratop" className="w-full h-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="cratop">크레탑</TabsTrigger>
                        <TabsTrigger value="report">보고서</TabsTrigger>
                    </TabsList>

                    {/* 크레탑 섹션  className="flex w-full h-full max-h-[calc(100%-20px)] " */}
                    <TabsContent value="cratop" className="h-full">                    
                        <div className="ag-theme-alpine h-full pb-10" style={{ fontSize:'12px', width: '100%', height: '100%' } }>
                            <AgGridReact
                                rowData={dataResultCratop} 
                                rowHeight={36}
                                columnDefs={CratopColumnDefs} 
                                defaultColDef={defaultColDef}
                                tooltipShowDelay={0} //툴팁 바로 표시
                                onCellClicked={onCellClicked} // 클릭 이벤트 핸들러                    
                                // domLayout="autoHeight"
                                localeText={{noRowsToShow: '조회 결과가 없습니다.'}}
                            />
                        </div>
                        
                    </TabsContent>

                    {/* 보고서 섹션 */} 
                    <TabsContent value="report" className="h-full">
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 h-full"> */}
                        <div className="ag-theme-alpine h-full pb-10" style={{ fontSize:'12px', width: '100%', height: '100%' } }>
                            {/* 보고서 생성 대기 현황 */}
                            <div className="mt-4 space-y-2 h-[40%] mb-10">
                                <div className="flex flex-row items-center gap-2">
                                    <MdPushPin size={16} color="#0EA5E9" className="translate-y-0.5"/>
                                    <h1 className="font-bold opacity-80">보고서 생성 대기 현황</h1>
                                </div>

                                <div className="ag-theme-alpine h-full" style={{ fontSize:'12px', width: '100%',  height: '100%'} }>
                                    <AgGridReact
                                        rowData={dataResultReport} 
                                        rowHeight={36}
                                        columnDefs={ReportColumnDefs} 
                                        defaultColDef={defaultColDef}
                                        tooltipShowDelay={0} //툴팁 바로 표시
                                        onCellClicked={onCellClicked} // 클릭 이벤트 핸들러                            
                                        // domLayout="autoHeight"
                                        localeText={{noRowsToShow: '대기중인 보고서가 없습니다.'}}
                                    />
                                </div>
                            </div>

                            {/* 직전 보고서 생성 현황 */}
                            <div className="mt-4 space-y-2 h-[50%] pb-10">
                                <div className="flex flex-row items-center gap-2">
                                    <MdPushPin size={16} color="#0EA5E9" className="translate-y-0.5"/>
                                    <h1 className="font-bold opacity-80">직전 보고서 생성 현황 (최근 10건)</h1>
                                </div>

                                <div className="ag-theme-alpine h-full" style={{ fontSize:'12px', width: '100%',  height: '100%'} }>
                                    <AgGridReact
                                        rowData={dataResultReportBefore} 
                                        rowHeight={36}
                                        columnDefs={ReportColumnDefs} 
                                        defaultColDef={defaultColDef}
                                        tooltipShowDelay={0} //툴팁 바로 표시
                                        onCellClicked={onCellClicked} // 클릭 이벤트 핸들러      
                                        // domLayout="autoHeight"
                                        localeText={{noRowsToShow: '직전에 생성된 보고서가 없습니다.'}}
                                    />
                                </div>
                            </div>
                        </div>

                    </TabsContent>
                </Tabs>
                ) :
                (
                    <div></div>
                )
             }

             {isDialogOpen && (
            <AlertDialogDemo isOpen={isDialogOpen} title="상세정보"  content = {desc} onClose={() => setIsDialogOpen(false)} />
            )}

        </div>
    );
}

export default StatelyDetail;
