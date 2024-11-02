"use client"
import Image from "next/image"
import { useState } from "react"

export default function DashboardNav() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <nav className="main-nav">
      {/* THIS IS THE LOGO */}
      <header className="logo">
        <Image src="/logo.svg" alt="Lendsqr logo" fill />
      </header>
      {/* LOGO ENDS */}

      {/* THIS IS THE SEARCH BAR */}
      <div className="searchBar">
        <input
          id="search"
          type="text"
          placeholder="Search for anything"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <span className="search icon" onClick={() => null}>
          <Image
            src="/search-icon.svg"
            alt="search icon"
            width={50}
            height={50}
          />
        </span>
      </div>
      {/* SEARCH BAR ENDS */}

      {/* THIS IS THE USER AVATAR AREA */}
      <div className="avatar-section">
        <a
          href="https://lendsqr.freshdesk.com/support/home?utm_source=lendsqr-menu"
          target="_blank"
          rel="noopener noreferrer"
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
