"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

type LoginFormProps = {
  onLogin: (userid: string, password: string) => void
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [userID, setuserID] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(userID, password)
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col items-center justify-center h-[100px] p-20">
            <Image src="/logo.png" width={190} height={90} alt="Logo" style={{ width: 'auto', height: 'auto' }} priority/>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="userid">아이디(ID)</Label>
                  <Input
                    id="userid"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={userID}
                    onChange={(e) => setuserID(e.target.value)}
                    required
                    className="placeholder:text-gray-300 text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">비밀번호</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="비밀번호를 입력하세요" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="placeholder:text-gray-300 text-sm"
                  />
                </div>
                {/* <Link href="/mega" > */}
                    <Button type="submit" className="w-full bg-[#4738a2] font-semibold" onClick={handleSubmit}>
                    로그인하기
                    </Button>
                {/* </Link> */}
              </div>
              
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-center text-white text-xs mt-4">
        Gradap.kr에 등록한 아이디와 휴대폰번호 뒤 4자리를 입력합니다.
      </div>
    </div>
  );
}

export default LoginForm;
