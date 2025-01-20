"use client"

import { UserSubContext } from "@/context/UserSubContext";
import { IUserInfo } from "@/types";
import { useState } from "react";

import NavDashboard from '@/components/Dashboard/NavDashboard'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [userSub, setUserSub] = useState<IUserInfo | null>(null);

    return (
        <div className='flex flex-col '>
            <UserSubContext.Provider value={{userSub, setUserSub}}> 
              <div className="fixed top-0 left-0 right-0 z-40">
                  <NavDashboard />
              </div>
              <div className="flex-1 mt-[48px] mb-[63px] overflow-y-auto">
                {children}
              </div>
            </UserSubContext.Provider>
        </div>

    )
  }
