"use client"

import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation'

function Nav() {
  const router = useRouter()

  return (
    <div className="flex flex-row h-[48px] border-b-[1px] items-center px-4 bg-white">
      <button onClick={() => router.back()}>
        <ArrowLeft size={18}/>
      </button>
      <div className='flex w-full h-full items-center justify-center'>
        <p className='text-[16px]'>통계</p>
      </div>
    </div>
  );
}

export default Nav;
