
import NavState from '@/components/State/NavState'
import UserInfoCard from '@/components/UserInfoCard'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className='flex flex-col w-full h-svh'>
          <div className='absolute flex-col top-0 left-0 right-0 z-50 bg-white'>
            <div className="flex flex-col h-[70px] p-4 gap-2 bg-[#F4F4FA]">
              <UserInfoCard />
            </div>
            <div className='h-[48px]'>
              <NavState />
              </div>
          </div>
          <div className="flex-1 mt-[118px] mb-[10px] overflow-y-auto">
            {children}
          </div>
        </div>

    )
  }
