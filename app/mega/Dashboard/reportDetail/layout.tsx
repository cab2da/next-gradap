
import Nav from '@/components/Dashboard/Nav'
import { Button } from '@/components/ui/button'
import UserSubInfoCard from '@/components/UserSubInfoCard'
import Link from 'next/link'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <div className='flex flex-col w-full min-h-full'>
        <div className='fixed flex-col top-12 left-0 right-0 z-50 bg-white'>
          {/* 상단 섹션 */}
          <div className="flex flex-col p-4 gap-2 bg-[#F4F4FA]">
              <div className='flex flex-row justify-between'>
                  <UserSubInfoCard />
                  <Link href='/mega/Dashboard'>
                    <Button variant='outline'>목록으로</Button>
                  </Link>
              </div>
          </div>

            <div className='h-[48px]'>
              <Nav />
            </div>
        </div>

        <div className="flex-1 mt-[120px] mb-[10px] overflow-y-auto">
              {children}
            </div>
      </div>

    )
  }
