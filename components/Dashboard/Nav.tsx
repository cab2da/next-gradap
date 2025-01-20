"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function Nav() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-3 h-vh border-t-[1px] border-b-[1px]">
      <Link href="/mega/Dashboard/reportDetail/Weekly" passHref>
        <div className={`p-3 col-span-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer ${pathname === '/mega/Dashboard/reportDetail/Weekly' ? 'bg-[#E9E7F4] border-b-[2px] border-[#4738a2]' : ''}`}>
          <span className="text-sm">주간보고</span>
        </div>
      </Link>
      <Link href="/mega/Dashboard/reportDetail/Monthly" passHref>
        <div className={`p-3 col-span-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer ${pathname === '/mega/Dashboard/reportDetail/Monthly' ? 'bg-[#E9E7F4] border-b-[2px] border-[#4738a2]' : ''}`}>
          <span className="text-sm">월간보고</span>
        </div>
      </Link>
      <Link href="/mega/Dashboard/reportDetail/Yearly" passHref>
        <div className={`p-3 col-span-1 flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer ${pathname === '/mega/Dashboard/reportDetail/Yearly' ? 'bg-[#E9E7F4] border-b-[2px] border-[#4738a2]' : ''}`}>
          <span className="text-sm">년간보고</span>
        </div>
      </Link>
    </div>
  );
}

export default Nav;
