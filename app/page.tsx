"use client"

import LoginForm from "@/components/Login-form";
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { UserContext  } from '@/context/UserContext'

export default function Home() {
  const router = useRouter()

  const contextUser = useContext(UserContext);
  if (!contextUser) {
    throw new Error('userInfo must be used within a SelectedLawdCodeContext.Provider');
  }
  const { user, setUser } = contextUser;
  
  const handleLogin = async (userID: string, password: string) => {
    const params = { userID, password }

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ params }),
      });
      const { success, message, result } = await res.json();

      const userInfo = {
        userName: result[0].user_name,
        userDepart: result[0].user_depart,
        userLevel: result[0].user_level,
      };

      setUser(userInfo);

      if (success) {
        router.push('/mega');
      } else {
        alert(message || '로그인 실패. 아이디와 비밀번호를 확인하세요.');
      }
    } catch (err) {
      console.error(err);
      alert('알 수 없는 오류가 발생했습니다.');
    }
  }
  
  return (
    <div className="nd-page login flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col">
          <h3 className="flex item center justify-center text-white text-[18px]" style={{ fontWeight: '400' }}>컨설팅 활동&nbsp;<b>AI</b>&nbsp;지원시스템</h3>
          <h4 className="flex item center justify-center text-[#C7C3E3] text-[10px]">CASS : CONSULTING ACTIVITY&nbsp;<b>AI</b>&nbsp;SUPPORT SYSTEM </h4>
        </div>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
