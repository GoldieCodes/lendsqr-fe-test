import TopNav from "../components/TopNav"
import DashboardSideMenu from "../components/DashboardSideMenu"
import { MenuContextProvider } from "../contextAPIs/MenuContextProvider"

// MAIN LAYOUT COMPONENT FOR THE DASHBOARD, WRAPS AROUND ALL DASHBOARD PAGES
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* PROVIDES SHARED DASHBOARD UI ELEMENTS LIKE THE TOP NAVIGATION AND SIDEBAR */}
      <MenuContextProvider>
        {/* TOP NAVIGATION COMPONENT */}
        <TopNav />

        {/* MAIN DASHBOARD LAYOUT CONTAINER */}
        <div>
          <main className="dashboardBodyLayout">
            {/* SIDEMENU COMPONENT THAT ADAPTS TO MOBILE MENU STATE */}
            <DashboardSideMenu />
            {/* RENDER CHILD COMPONENTS WITHIN THE DASHBOARD CONTEXT */}
            {children}
          </main>
        </div>
      </MenuContextProvider>
    </>
  )
}
