"use client"
import { useEffect, useState } from "react"
import { UserDetailsResponse } from "./userDetailsInterface"
import Icon from "@/app/components/Icon"

const detailHeaders = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
]

//THE MAIN COMPONENT EXPORT

export default function UserDetailsData() {
  const [userDetails, setUserDetails] = useState<UserDetailsResponse | null>(
    () => initFetchData()
  )

  async function fetchData() {
    try {
      const response = await fetch(
        "https://run.mocky.io/v3/196e9e5e-be72-435b-98d8-53c41270a5e3"
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data: UserDetailsResponse = await response.json()
      localStorage.setItem("userDetails", JSON.stringify(data))
      localStorage.setItem("userDetailsFetchTimestamp", Date.now().toString())
      setUserDetails(data)
    } catch (error) {
      throw new Error("Data fetch could not complete")
    }
  }

  useEffect(() => {
    if (!userDetails) {
      fetchData()
    }
  }, [userDetails])

  if (!userDetails) return <div>Loading...</div>

  return (
    <section>
      <section className="userOverview">
        <div className="topDetails">
          <div>
            <Icon filename="icon-user.svg" />
            <span>
              <h2>{userDetails.profile_summary.name}</h2>
              <p>{userDetails.profile_summary.user_id}</p>
            </span>
          </div>
          <div>
            <p>User's Tier</p>
            <span className="rating">
              <Icon filename="star-full.svg" />
              <Icon filename="star-empty.svg" />
              <Icon filename="star-empty.svg" />
            </span>
          </div>
          <div>
            <h2>{userDetails.profile_summary.account_balance}</h2>
            <p>
              {userDetails.profile_summary.account_number}/
              {userDetails.profile_summary.bank_name}
            </p>
          </div>
        </div>
        <div className="detailHeaders">
          {detailHeaders.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="informationBox">
        <div className="infoSection">
          <h3>Personal Information</h3>
          <ul>
            {userDetails.personal_information.map((item, index) => (
              <li key={`${item.value}.${index}`}>
                {item.label} <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="infoSection">
          <h3>Education and Employment</h3>
          <ul>
            {userDetails.education_and_employment.map((item, index) => (
              <li key={`${item.value}.${index}`}>
                {item.label} <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="infoSection">
          <h3>Socials</h3>
          <ul>
            {userDetails.socials.map((item, index) => (
              <li key={`${item.value}.${index}`}>
                {item.label} <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="infoSection">
          <h3>Guarantor</h3>
          <ul>
            {userDetails.guarantor.map((item, index) => (
              <li key={`${item.value}.${index}`}>
                {item.label} <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  )
}
// MAIN COMPONENT FUNCTION ENDS.

function initFetchData() {
  const refreshRate = 100 * 60 * 60 * 24
  const data = localStorage.getItem("userDetails")
  const dataStamptime = localStorage.getItem("userFetchTimestamp")
  if (data && dataStamptime) {
    const parseData = JSON.parse(data)
    const parseTime = parseInt(dataStamptime, 10)
    const timeNow = Date.now()

    if (timeNow - parseTime < refreshRate) return parseData
    else return null
  }
}
