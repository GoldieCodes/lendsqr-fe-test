"use client" // Enable Next.js client-side rendering for this component

// Import necessary components and hooks from Next.js
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { MenuContextProvider } from "../dashboard/layout"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase"

// Dashboard side menu component
export default function DashboardSideMenu() {
  // Access the context state for controlling mobile menu visibility
  const MenuContext = useContext(MenuContextProvider)

  // Define customer menu items with corresponding icons and text
  const customers = [
    { icon: "/user-friends.svg", text: "Users" },
    { icon: "/users.svg", text: "Guarantors" },
    { icon: "/sack.svg", text: "Loans" },
    { icon: "/handshake-regular.svg", text: "Decision Models" },
    { icon: "/piggy-bank.svg", text: "Savings" },
    { icon: "/hand-with-money.svg", text: "Loan Requests" },
    { icon: "/user-check.svg", text: "Whitelist" },
    { icon: "/user-times.svg", text: "Karma" },
  ]

  // Define business menu items with corresponding icons and text
  const businesses = [
    { icon: "/briefcase.svg", text: "Organization" },
    { icon: "/hand-with-money.svg", text: "Loan Products" },
    { icon: "/np_bank.svg", text: "Savings Products" },
    { icon: "/coins-solid.svg", text: "Fees and Charges" },
    { icon: "/icon.svg", text: "Transactions" },
    { icon: "/galaxy.svg", text: "Services" },
    { icon: "/user-cog.svg", text: "Service Account" },
    { icon: "/scroll.svg", text: "Settlements" },
    { icon: "/chart-bar.svg", text: "Reports" },
  ]

  // Define settings menu items with corresponding icons and text
  const settings = [
    { icon: "/sliders-h.svg", text: "Preferences" },
    { icon: "/badge-percent.svg", text: "Fees and Pricing" },
    { icon: "/clipboard-list.svg", text: "Audit Logs" },
    { icon: "/tire.svg", text: "Systems Messages" },
  ]

  return (
    // Main navigation wrapper, conditionally adds a class for mobile view
    <nav
      className={`sidemenu ${
        MenuContext?.mobileMenuOpen ? "openMobileSideMenu" : ""
      }`}
    >
      {/* Switch Organization Link */}
      <div className="sideMenuLink">
        <span className="icon">
          <Image src="/briefcase.svg" alt="briefcase" fill />
        </span>
        <p>Switch Organization</p>
        <span className="icon">
          <Image src="/np_next.svg" alt="arrow" fill />
        </span>
      </div>

      {/* Dashboard Link */}
      <div className="sideMenuLink">
        <span className="icon">
          <Image src="/home.svg" alt="home" fill />
        </span>
        <p>Dashboard</p>
      </div>

      {/* Customer Menu Section */}
      <div className="customers">
        <h3>CUSTOMERS</h3>
        {customers.map((item) =>
          item.text === "Users" ? (
            // Special case: Link component used for "Users" menu item
            <div
              className="sideMenuLink"
              key={item.text}
              data-key={`${item.text.toLowerCase()} icon`}
            >
              <Link href="/dashboard">
                <span className="icon">
                  <Image src={item.icon} alt={`${item.text} icon`} fill />
                </span>
                <p>{item.text}</p>
              </Link>
            </div>
          ) : (
            // Standard menu items without links
            <div
              className="sideMenuLink"
              key={item.text}
              data-key={`${item.text.toLowerCase()} icon`}
            >
              <span className="icon">
                <Image src={item.icon} alt={`${item.text} icon`} fill />
              </span>
              <p>{item.text}</p>
            </div>
          )
        )}
      </div>

      {/* Business Menu Section */}
      <div className="businesses">
        <h3>BUSINESSES</h3>
        {businesses.map((item) => (
          <div
            className="sideMenuLink"
            key={item.text}
            data-key={`${item.text.toLowerCase()} icon`}
          >
            <span className="icon">
              <Image src={item.icon} alt={`${item.text} icon`} fill />
            </span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Settings Menu Section */}
      <div className="settings">
        <h3>SETTINGS</h3>
        {settings.map((item) => (
          <div
            className="sideMenuLink"
            key={item.text}
            data-key={`${item.text.toLowerCase()} icon`}
          >
            <span className="icon">
              <Image src={item.icon} alt={`${item.text} icon`} fill />
            </span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Logout Section */}
      <div className="logout">
        <div className="sideMenuLink">
          <span className="icon">
            <Image src="/sign-out.svg" alt="sign out" fill />
          </span>
          <Link href="/" onClick={() => signOut(auth)}>
            <p>Logout</p>
          </Link>
        </div>
        {/* Version info */}
        <p>v.1.2.0</p>
      </div>
    </nav>
  )
}
