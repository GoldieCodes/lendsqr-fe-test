import DashboardNav from "./nav"
import DashboardSideMenu from "./sidemenu"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Includes shared UI here e.g. a header or sidebar */}
      <DashboardNav />
      <main className="dashboardBodyLayout">
        <DashboardSideMenu />
        {children}
      </main>
    </>
  )
}
