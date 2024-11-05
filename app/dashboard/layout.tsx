"use client"
import TopNav from "../components/TopNav"
import DashboardSideMenu from "../components/DashboardSideMenu"
import { createContext, useState } from "react"

// TYPE DEFINITION FOR THE MENU CONTEXT PROPERTIES
type MenuContextType = {
  mobileMenuOpen: boolean
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// CREATES A CONTEXT TO MANAGE STATE OF MOBILE MENU VISIBILITY ACROSS THE DASHBOARD COMPONENTS
export const MenuContextProvider = createContext<MenuContextType | null>(null)

// MAIN LAYOUT COMPONENT FOR THE DASHBOARD, WRAPS AROUND ALL DASHBOARD PAGES
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // STATE TO CONTROL THE OPEN/CLOSED STATE OF THE MOBILE SIDEMENU
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <>
      {/* PROVIDES SHARED DASHBOARD UI ELEMENTS LIKE THE TOP NAVIGATION AND SIDEBAR */}
      <MenuContextProvider.Provider
        value={{ mobileMenuOpen, setMobileMenuOpen }}
      >
        {/* TOP NAVIGATION COMPONENT */}
        <TopNav />

        {/* MAIN DASHBOARD LAYOUT CONTAINER */}
        <main className="dashboardBodyLayout">
          {/* SIDEMENU COMPONENT THAT ADAPTS TO MOBILE MENU STATE */}
          <DashboardSideMenu />

          {/* RENDER CHILD COMPONENTS WITHIN THE DASHBOARD CONTEXT */}
          {children}
        </main>
      </MenuContextProvider.Provider>
    </>
  )
}
