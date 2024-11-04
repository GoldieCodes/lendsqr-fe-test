"use client"
import Image from "next/image"
import { useState, useContext } from "react"
import { MenuContextProvider } from "../dashboard/layout"
import Icon from "./Icon"
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri"

export default function TopNav() {
  const [searchTerm, setSearchTerm] = useState<string>()
  const MenuContext = useContext(MenuContextProvider)

  return (
    <nav className="main-nav">
      {/* THIS IS THE LOGO */}
      <header className="logo">
        <Image src="/logo.svg" alt="Lendsqr logo" fill />
      </header>
      {/* LOGO ENDS */}

      {/* THIS IS THE SEARCH BAR AREA*/}
      <div className="mobileMenuArea">
        {/* MENU ICON FOR MOBILE MENU */}
        <div>
          <span
            className="icon menu"
            onClick={() => {
              MenuContext?.setMobileMenuOpen(!MenuContext?.mobileMenuOpen)
              console.log(MenuContext?.mobileMenuOpen)
            }}
          >
            {MenuContext?.mobileMenuOpen ? (
              <RiMenuUnfold2Line />
            ) : (
              <RiMenuFold2Line />
            )}
          </span>
          {/* SEARCH INPUT FIELD */}
          <div className="searchBar">
            <input
              id="search"
              type="text"
              placeholder="Search for anything"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Icon filename="search-icon.svg" className="search" />
          </div>
        </div>

        {/* GO TO DOCUMENTATION LINK */}
        <a
          href="https://lendsqr.freshdesk.com/support/home?utm_source=lendsqr-menu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </a>
      </div>
      {/* SEARCH BAR AREA ENDS */}

      {/* THIS IS THE USER AVATAR AREA */}
      <div className="avatar-section">
        <span className="icon bell">
          <Image src="/notification-bell.png" alt="notification icon" fill />
        </span>
        <div className="user icon">
          <span className="icon avatar">
            <Image src="/user-avatar.svg" alt="user avatar" fill />
          </span>
          <p>Adedeji</p>
          <span className="icon arrow">
            <Image src="/arrow.svg" alt="dropdown arrow" fill />
          </span>
        </div>
      </div>
      {/* USER AVATAR AREA ENDS */}
    </nav>
  )
}
