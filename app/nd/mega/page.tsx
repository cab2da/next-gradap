// pages/index.tsx
import Link from 'next/link';
import React from 'react';
import { LogOut, Sigma, Wand } from 'lucide-react';
import { IoHomeSharp } from 'react-icons/io5';

const MegaHome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen nd-page summary pb-32">
      <div className="grid grid-cols-2 gap-2 relative">

        <Link href='/nd/mega' className='flex flex-col items-center justify-center w-32 h-32 bg-neutral-100 text-gray-600 rounded-tl-3xl hover:bg-neutral-400 gap-1'>
            {/* <House size={18} /> */}
            <IoHomeSharp size="18" color='#4B5563' />
            <span className='text-[12px] font-semibold'>홈</span>
        </Link>

        <Link href='/nd/mega/Dashboard/Weekly' className='flex flex-col items-center justify-center w-32 h-32 bg-neutral-200 text-gray-600 rounded-tr-3xl hover:bg-neutral-400 gap-1'>
            <Sigma size={18}/>
            <span className='text-[12px] font-semibold'>통계</span>
        </Link>

        <Link href='/nd/mega/Stately/Info' className='flex flex-col items-center justify-center w-32 h-32 bg-neutral-400 rounded-bl-3xl hover:bg-neutral-200 text-white hover:text-gray-600 gap-1'>
            <Wand size={18}/>
            <span className='text-[12px] font-semibold'>상태</span>
        </Link>            

        <Link href='/nd' className='flex flex-col items-center justify-center w-32 h-32 bg-neutral-300 text-gray-600 rounded-br-3xl hover:bg-neutral-400 gap-1'>
            <LogOut size={18} />
            <span className='text-[12px] font-semibold'>로그아웃</span>
        </Link>

        {/* 가운데 노란 원 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 nd-page summary opacity-90 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MegaHome;
