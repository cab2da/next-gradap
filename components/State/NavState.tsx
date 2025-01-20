"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function NavState() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-2 border-t-[1px] border-b-[1px]">
      <Link href="/mega/Stately/Info" passHref>
        <div className={`p-3 col-span-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer ${pathname === '/mega/Stately/Info' ? 'bg-[#E9E7F4] border-b-[2px] border-[#4738a2]' : ''}`}>
          <span className="text-sm">상태 정보</span>
        </div>
      </Link>
      <Link href="/mega/Stately/Detail" passHref>
        <div className={`p-3 col-span-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer ${pathname === '/mega/Stately/Detail' ? 'bg-[#E9E7F4] border-b-[2px] border-[#4738a2]' : ''}`}>
          <span className="text-sm">상세 정보</span>
        </div>
      </Link>
    </div>
  );
}

export default NavState;
