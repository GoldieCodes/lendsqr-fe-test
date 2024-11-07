"use client"
import Image from "next/image"
import { useEffect } from "react"
import { useMenuContextProvider } from "../dashboard/layout"
import Icon from "./Icon"
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri"
import { usePathname } from "next/navigation"

export default function TopNav() {
  // pulling in all the variables needed from the context provider on the layout.tsx page
  const {
    users,
    setAugmentedUsersList,
    mobileMenuOpen,
    setMobileMenuOpen,
    search,
    setSearch,
  } = useMenuContextProvider()

  const pathname = usePathname()

  // the search functionality
  useEffect(() => {
    //search should only work on dashboard
    if (users) {
      if (search != "" && pathname.match("/dashboard")) {
        const searchResult = users.filter(
          (each) =>
            each.username.toLowerCase().match(search.toLowerCase()) || //sanitizing inputs before comparison
            each.email.toLowerCase().match(search.toLowerCase()) ||
            each.organization.toLowerCase().match(search.toLowerCase()) ||
            each.phone_number.toLowerCase().match(search.toLowerCase()) ||
            each.status.toLowerCase().match(search.toLowerCase()) ||
            each.date_joined.toLowerCase().match(search.toLowerCase())
        )
        setAugmentedUsersList(searchResult)
      } else setAugmentedUsersList(users.slice(0, 50))
    }
  }, [search, pathname])

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
              setMobileMenuOpen(!mobileMenuOpen)
              console.log(mobileMenuOpen)
            }}
          >
            {mobileMenuOpen ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
          </span>
          {/* SEARCH INPUT FIELD */}
          <div className="searchBar">
            <input
              id="search"
              type="text"
              placeholder="Search for anything"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Icon filename="search-icon.svg" className="search" />
          </div>
        </div>

        {/* GO TO DOCUMENTATION LINK FOR MOBLIE LAYOUT */}
        <a
          href="https://lendsqr.freshdesk.com/support/home?utm_source=lendsqr-menu"
          target="_blank"
          rel="noopener noreferrer"
          className="for-mobile"
        >
          Docs
        </a>
      </div>
      {/* SEARCH BAR AREA ENDS */}

      {/* THIS IS THE USER AVATAR AREA */}
      {/* GO TO DOCS LINK FOR DESKTOP SCREENS */}
      <div className="avatar-section">
        <a
          href="https://lendsqr.freshdesk.com/support/home?utm_source=lendsqr-menu"
          target="_blank"
          rel="noopener noreferrer"
          className="for-desktop"
        >
          Docs
        </a>

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
