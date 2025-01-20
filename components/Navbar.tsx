"use client"

import { LogOut, Sigma, Wand } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
          // 서버에서 쿠키 삭제
          const response = await fetch('/api/logout', { method: 'POST', cache: 'no-store' });

          if (response.ok) {
            // 홈 화면으로 이동
            router.push('/');
          } else {
            console.error('Logout failed:', response.status);
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      

  return (
    <div className='flex flex-row w-full h-[63px] items-center justify-between px-10 py-4 bg-white border-t-[1px] border-[#F4F4F4]'>

        <Link href='/mega' className={`flex flex-col items-center gap-1 ${pathname === '/mega' ? 'text-sky-600' : 'text-gray-600'} `}>
            <IoHomeSharp size="18" />
            <span className={`text-[12px] font-semibold`}>HOME</span>
        </Link>      
        
        <Link href='/mega/Dashboard' className={`flex flex-col items-center gap-1 
          ${pathname.startsWith('/mega/Dashboard') ? 'text-sky-600' : 'text-gray-600'} `}>
            <Sigma size={18} />
            <span className={`text-[12px] font-semibold`}>통계</span>
        </Link>
        
        <Link href='/mega/Stately/Info' className={`flex flex-col items-center gap-1 
          ${pathname.startsWith('/mega/Stately') ? 'text-sky-600' : 'text-gray-600'} `}>
            <Wand size={18} />
            <span className={`text-[12px] font-semibold`}>상태</span>
        </Link>
        
        <button className='flex flex-col items-center gap-1 text-gray-600' onClick={handleLogout}>
            <LogOut size={18} />
            <span className={`text-[12px] font-semibold`}>LogOut</span>
        </button>

    </div>
  );
}

export default Navbar;
