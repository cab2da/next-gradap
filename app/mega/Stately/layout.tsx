
import NavState from '@/components/State/NavState'
import UserInfo from '@/components/UserInfo'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className='flex flex-col w-full h-svh'>
          <div className='sticky top-0 left-0 right-0 bg-white z-50'>
              <UserInfo />
              <NavState />
          </div>

            {children}
        </div>

    )
  }
