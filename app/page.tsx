"use client"

import LoginForm from "@/components/Login-form";
import { useRouter } from 'next/navigation'
import { AlertDialogDemo } from "@/components/Alert-dialog";
import Loading from "@/app/loading";
import { useState } from "react";
import jwt from 'jsonwebtoken';

// const SERVERURL = process.env.NEXT_PUBLIC_API_SERVERURL;
// const SECRET_KEY = process.env.SESSION_SECRET

export default function Home() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 

  const handleLogin = async (userID: string, password: string) => {
    const params = { userID, password }
    setIsLoading(true); // 로딩 시작

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ params }),
      });
      const { success, message, result } = await res.json();

      if (success) {
        // console.log("로그인 성공")
        router.push('/mega');
      } else {
        setIsDialogOpen(true);
        setDesc("아이디와 비밀번호를 확인하세요.")
      }
    } catch (err) {
      console.error(err);

      setIsDialogOpen(true);
      setDesc("'알 수 없는 오류가 발생했습니다.")
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="nd-page login flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col">
            <h3 className="flex item center justify-center text-white text-[18px]" style={{ fontWeight: '400' }}>컨설팅 활동&nbsp;<b>AI</b>&nbsp;지원시스템</h3>
            <h4 className="flex item center justify-center text-[#C7C3E3] text-[10px]">CASS : CONSULTING ACTIVITY&nbsp;<b>AI</b>&nbsp;SUPPORT SYSTEM </h4>
          </div>
          <LoginForm onLogin={handleLogin} />
        </div>
        {isDialogOpen && (
          <AlertDialogDemo isOpen={isDialogOpen} title="로그인 실패" content={desc} onClose={() => setIsDialogOpen(false)} />
        )}
      </div>
    );
  }
}
