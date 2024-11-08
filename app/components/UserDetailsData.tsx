"use client"
import { useEffect, useState } from "react"
import { CompleteUserInfo } from "./userDetailsInterface"
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

export default function UserDetailsData({ userId }: { userId: string }) {
  const [userDetails, setUserDetails] = useState<CompleteUserInfo[] | null>(
    null
  )

  // CALLS THE CHECK DATA FUNCTION TO RETRIEVE DATA IF EXISTING
  useEffect(() => {
    const storedData = checkStorageData<CompleteUserInfo>(
      "userDetails",
      "userDetailsTimeStamp",
      1,
      1
    )
    if (storedData) {
      const [completeData, paginatedData] = storedData
      setUserDetails(completeData)
      console.log(completeData)
    } else runApiFetch() //RETRIEVES DATA DIRECTLY FROM THE API WHERE STORAGE DATA WAS ABSENT OR DIDN'T MEET REQUIREMENTS

    // THIS IS THE API FETCH FUNCTION CALLED ABOVE
    async function runApiFetch() {
      const newDataFetch = await fetchApiData<CompleteUserInfo>(
        "https://run.mocky.io/v3/8db4638f-f448-46c0-bcc9-4e0212973c16",
        "userDetails",
        "userDetailsTimeStamp",
        1,
        1
      )
      if (newDataFetch) {
        const [completeData, paginatedData] = newDataFetch
        setUserDetails(completeData)
      }
    }
  }, [userId])

  if (!userDetails)
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )

  return (
    <>
      {userDetails.map((item) => {
        if (item.user_id == userId)
          return (
            <section key={item.user_id}>
              <section className="userOverview">
                {/* MAPPING THROUGH THE USER DETAILS RESPONSE RECEIVED */}

                <div className="topDetails">
                  <div>
                    <Icon filename="icon-user.svg" />
                    <span>
                      <h2>{item.username}</h2>
                      <p>{item.user_id}</p>
                    </span>
                  </div>
                  <div>
                    <p>User's Tier</p>
                    <span className="rating">
                      {item.user_tier === 1 ? (
                        <>
                          <Icon filename="star-full.svg" />
                          <Icon filename="star-empty.svg" />
                          <Icon filename="star-empty.svg" />
                        </>
                      ) : item.user_tier === 2 ? (
                        <>
                          <Icon filename="star-full.svg" />
                          <Icon filename="star-full.svg" />
                          <Icon filename="star-empty.svg" />
                        </>
                      ) : (
                        <>
                          <Icon filename="star-full.svg" />
                          <Icon filename="star-full.svg" />
                          <Icon filename="star-full.svg" />
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <h2>{item.account_balance}</h2>
                    <p>
                      {item.account_number}/{item.bank_name}
                    </p>
                  </div>
                </div>

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
                    <li>
                      Full Name{" "}
                      <strong>{item.personal_information.full_name}</strong>
                    </li>
                    <li>
                      Phone Number{" "}
                      <strong>{item.personal_information.phone_number}</strong>
                    </li>
                    <li>
                      Email Address{" "}
                      <strong>{item.personal_information.email_address}</strong>
                    </li>
                    <li>
                      BVN <strong>{item.personal_information.bvn}</strong>
                    </li>
                    <li>
                      Gender <strong>{item.personal_information.gender}</strong>
                    </li>
                    <li>
                      Marital Status{" "}
                      <strong>
                        {item.personal_information.marital_status}
                      </strong>
                    </li>
                    <li>
                      Children{" "}
                      <strong>{item.personal_information.children}</strong>
                    </li>
                    <li>
                      Type of Residence{" "}
                      <strong>
                        {item.personal_information.type_of_residence}
                      </strong>
                    </li>
                  </ul>
                </div>
                <div className="infoSection">
                  {/* EDUCATION AND EMPLOYMENT SECTION */}
                  <h3>Education and Employment</h3>
                  <ul>
                    <li>
                      Level of Education{" "}
                      <strong>
                        {item.education_and_employment.level_of_education}
                      </strong>
                    </li>
                    <li>
                      Employment Status{" "}
                      <strong>
                        {item.education_and_employment.employment_status}
                      </strong>
                    </li>
                    <li>
                      Sector of Employment{" "}
                      <strong>
                        {item.education_and_employment.sector_of_employment}
                      </strong>
                    </li>
                    <li>
                      Duration of Employment{" "}
                      <strong>
                        {item.education_and_employment.duration_of_employment}
                      </strong>
                    </li>
                    <li>
                      Office Email{" "}
                      <strong>
                        {item.education_and_employment.office_email}
                      </strong>
                    </li>
                    <li>
                      Monthly Income{" "}
                      <strong>
                        {item.education_and_employment.monthly_income}
                      </strong>
                    </li>
                    <li>
                      Loan Repayment{" "}
                      <strong>
                        {item.education_and_employment.loan_repayment}
                      </strong>
                    </li>
                  </ul>
                </div>

                {/* SOCIALS SECTION */}
                <div className="infoSection">
                  <h3>Socials</h3>
                  <ul>
                    <li>
                      Twitter <strong>{item.socials.twitter}</strong>
                    </li>
                    <li>
                      Facebook <strong>{item.socials.facebook}</strong>
                    </li>
                    <li>
                      Instagram <strong>{item.socials.instagram}</strong>
                    </li>
                  </ul>
                </div>

                {/* GUARANTOR SECTION */}
                <div className="infoSection">
                  <h3>Guarantor</h3>
                  <ul>
                    <li>
                      Full Name <strong>{item.guarantor.full_name}</strong>
                    </li>
                    <li>
                      Phone Number{" "}
                      <strong>{item.guarantor.phone_number}</strong>
                    </li>
                    <li>
                      Email Address{" "}
                      <strong>{item.guarantor.email_address}</strong>
                    </li>
                    <li>
                      Relationship{" "}
                      <strong>{item.guarantor.relationship}</strong>
                    </li>
                  </ul>
                </div>
              </section>
            </section>
          )
      })}
    </>
  )
}
// MAIN COMPONENT FUNCTION ENDS.
