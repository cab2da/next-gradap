"use client"

import Navbar from '@/components/Navbar'


export default function MegaLayout({ children }: { children: React.ReactNode }) {
  return (
   
      <div className="border-none">
        {children}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Navbar />
        </div>
      </div>
   
  );
}

