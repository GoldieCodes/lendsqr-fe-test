import Icon from "@/app/components/Icon"
import Link from "next/link"
import UserDetailsData from "@/app/components/UserDetailsData"

// MAIN COMPONENT TO DISPLAY DETAILED INFORMATION OF A SPECIFIC USER
export default function UserDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <div className="dashbContentWrapper">
      {/* PRIMARY CONTENT AREA FOR USER DETAILS WITHIN DASHBOARD LAYOUT */}
      <main className="userDetails">
        {/* HEADER SECTION WITH NAVIGATION AND ACTION BUTTONS */}
        <header>
          {/* BACK LINK TO NAVIGATE BACK TO THE MAIN USER LIST ON DASHBOARD */}
          <Link href="/dashboard" className="linkBack">
            <Icon filename="arrow-back.svg" />
            BACK TO USERS
          </Link>

          {/* HEADER TITLE AND ACTION BUTTONS (BLACKLIST/ACTIVATE) */}
          <div className="buttonGroup">
            <h1>USER DETAILS</h1>
            <span className="buttons">
              {/* BUTTON TO BLACKLIST THE USER */}
              <button className="blacklist">BLACKLIST USER</button>

              {/* BUTTON TO ACTIVATE THE USER */}
              <button className="activate">ACTIVATE USER</button>
            </span>
          </div>
        </header>

        {/* COMPONENT RENDERING USER DETAILS DATA */}
        <UserDetailsData />
      </main>
    </div>
  )
}
