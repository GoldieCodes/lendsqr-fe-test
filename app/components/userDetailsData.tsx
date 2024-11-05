"use client"
import { useEffect, useState } from "react"
import { UserDetailsResponse } from "./userDetailsInterface"
import Icon from "@/app/components/Icon"
import { fetchApiData, checkStorageData } from "./fetchData"

// THIS DEFINES THE DATA USED FOR THE USER OVERVIEW SECTION, TO MAKE A CLEAN REUSABLE STRUCTURE
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
  const [userDetails, setUserDetails] = useState<UserDetailsResponse[] | null>(
    null
  )

  // CALLS THE CHECK DATA FUNCTION TO RETRIEVE DATA IF EXISTING
  useEffect(() => {
    const storedData = checkStorageData("userDetails", "userDetailsTimeStamp")
    if (storedData) {
      setUserDetails(storedData)
    } else runApiFetch() //RETRIEVES DATA DIRECTLY FROM THE API WHERE STORAGE DATA WAS ABSENT OR DIDN'T MEET REQUIREMENTS

    // THIS IS THE API FETCH FUNCTION CALLED ABOVE
    async function runApiFetch() {
      const newDataFetch = await fetchApiData(
        "https://run.mocky.io/v3/1ba5d146-df4d-405e-a251-70e82f99f663",
        "userDetails",
        "userDetailsTimeStamp"
      )
      setUserDetails(newDataFetch)
    }
  }, [])

  if (!userDetails)
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )

  return (
    <section>
      <section className="userOverview">
        {/* MAPPING THROUGH THE USER DETAILS RESPONSE RECEIVED */}
        {userDetails.map((item) =>
          item.map((item) => (
            <div className="topDetails" key={item.profile_summary.user_id}>
              <div>
                <Icon filename="icon-user.svg" />
                <span>
                  <h2>{item.profile_summary.name}</h2>
                  <p>{item.profile_summary.user_id}</p>
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
                <h2>{item.profile_summary.account_balance}</h2>
                <p>
                  {item.profile_summary.account_number}/
                  {item.profile_summary.bank_name}
                </p>
              </div>
            </div>
          ))
        )}

        {/* THIS IS THE HEADER DETAILS DATA DECLARED ON THE FIRST LINE */}
        <div className="detailHeaders">
          {detailHeaders.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      {/* PERSONAL INFORMATION SECTION */}
      <section className="informationBox">
        <div className="infoSection">
          <h3>Personal Information</h3>
          <ul>
            {userDetails.map((info) =>
              info.map((item, index) =>
                item.personal_information.map((item) => (
                  <li key={`${item}.${index}`}>
                    {item.label} <strong>{item.value}</strong>
                  </li>
                ))
              )
            )}
          </ul>
        </div>
        <div className="infoSection">
          {/* EDUCATION AND EMPLOYMENT SECTION */}
          <h3>Education and Employment</h3>
          <ul>
            {userDetails.map((info) =>
              info.map((item, index) =>
                item.education_and_employment.map((item, index) => (
                  <li key={`${item.value}.${index}`}>
                    {item.label} <strong>{item.value}</strong>
                  </li>
                ))
              )
            )}
          </ul>
        </div>

        {/* SOCIALS SECTION */}
        <div className="infoSection">
          <h3>Socials</h3>
          <ul>
            {userDetails.map((info) =>
              info.map((item, index) =>
                item.socials.map((item, index) => (
                  <li key={`${item.value}.${index}`}>
                    {item.label} <strong>{item.value}</strong>
                  </li>
                ))
              )
            )}
          </ul>
        </div>

        {/* GUARANTOR SECTION */}
        <div className="infoSection">
          <h3>Guarantor</h3>
          <ul>
            {userDetails.map((info) =>
              info.map((item, index) =>
                item.guarantor.map((item, index) => (
                  <li key={`${item.value}.${index}`}>
                    {item.label} <strong>{item.value}</strong>
                  </li>
                ))
              )
            )}
          </ul>
        </div>
      </section>
    </section>
  )
}
// MAIN COMPONENT FUNCTION ENDS.
