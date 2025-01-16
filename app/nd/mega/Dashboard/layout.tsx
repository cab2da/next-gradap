
import Nav from '@/components/Dashboard/Nav'
import UserInfo from '@/components/UserInfo';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
        <div>
            <UserInfo />
            <div>
                <Nav />
            </div>
            {children}
        </div>

    )
  }
