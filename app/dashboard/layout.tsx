"use client"
import TopNav from "../components/TopNav"
import DashboardSideMenu from "../components/DashboardSideMenu"
import { createContext, useState } from "react"

type MenuContextType = {
  mobileMenuOpen: boolean
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuContextProvider = createContext<MenuContextType | null>(null)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <>
      {/* Includes shared UI here e.g. the header and sidebar */}
      <MenuContextProvider.Provider
        value={{ mobileMenuOpen, setMobileMenuOpen }}
      >
        <TopNav />
        <main className="dashboardBodyLayout">
          <DashboardSideMenu />
          {children}
        </main>
      </MenuContextProvider.Provider>
    </>
  )
}
