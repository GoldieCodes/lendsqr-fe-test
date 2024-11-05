"use client" // Indicating that this component can use React hooks
import Image from "next/image"
import { useEffect, useState } from "react"
import { UsersListType } from "../components/userDetailsInterface"
import Icon from "../components/Icon"
import Link from "next/link"
import FilterUserList from "../components/FilterUserList"
import { FilterValues } from "../components/FilterUserList"
import { fetchApiData, checkStorageData } from "../components/fetchData"
import Pagination from "../components/Pagination"

// Overview data for the dashboard
const dashbOverview = [
  { icon: "/np_2users.svg", text: "Users", number: "2,453" },
  { icon: "/np_3users.svg", text: "Active users", number: "2,453" },
  { icon: "/np_loan.svg", text: "Users with loans", number: "12,453" },
  { icon: "/np_money.svg", text: "Users with savings", number: "102,453" },
]

// Headers for the user data table
const dataHeaders = [
  "organization",
  "username",
  "email",
  "phone number",
  "date joined",
  "status",
]

export default function Dashboard() {
  // State variables
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false) // Controls the visibility of user details dialog
  const [userId, setUserId] = useState<string | undefined>() // Holds the ID of the user for whom the details dialog is opened
  const [openFilter, setOpenFilter] = useState(false) // Controls the visibility of the filter options
  const [filterIconId, setFilterIconId] = useState<string | undefined>() // Tracks which filter icon is clicked
  const [users, setUsers] = useState<UsersListType | null>(null) // Holds the list of users
  const [filteredValues, setFilteredValues] = useState<UsersListType | null>(
    users
  )

  // Fetch data on component mount
  useEffect(() => {
    const storedData = checkStorageData("usersList", "usersListTimeStamp") // Check local storage for user data
    if (storedData) {
      setUsers(storedData)
      setFilteredValues(storedData)
      // Set both states if data is found in storage
    } else {
      fetchData() // If no data is found, fetch from API
    }

    async function fetchData() {
      const data = await fetchApiData(
        "https://run.mocky.io/v3/34ecde44-8db0-4c51-ac89-8cfb9ab57d07",
        "usersList",
        "usersListTimeStamp"
      )
      setUsers(data)
      setFilteredValues(data) // Update both states with fetched data
    }
  }, [])

  // Filter users based on provided filter fields
  function filterFunction(filterFields: FilterValues) {
    const filteredValues: UsersListType | null =
      users?.filter(
        (field) =>
          // Match fields with the filter values
          field.date_joined?.match(filterFields.date) &&
          field.email?.match(filterFields.email) &&
          field.organization?.match(filterFields.organization) &&
          field.phone_number?.match(filterFields.phoneNumber) &&
          field.status?.match(filterFields.status) &&
          field.username?.match(filterFields.username)
      ) || null

    setFilteredValues(filteredValues)
    setOpenFilter(false) // Close filter options after applying

    // State when no matching users found after filtering
    if (!filteredValues)
      return <div className="noFilterValue">No Match Found</div>
  }

  // Reset filters to show all users
  function resetFilter() {
    setFilteredValues(users)
    setOpenFilter(false) // Close filter options
  }

  // Loading state when users data is not available
  if (!users)
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )

  return (
    <div className="dashbContentWrapper">
      <main className="dashboardContentBody">
        <h1>Users</h1>
        <section className="overview">
          {/* Overview display */}
          {dashbOverview.map((item) => (
            <div
              className="itemBox"
              key={item.text}
              data-key={`${item.text.toLowerCase()}`}
            >
              <span className="icon">
                <Image
                  src={item.icon}
                  alt={`${item.text} icon`}
                  width={40}
                  height={40}
                />
              </span>
              <p>{item.text}</p>
              <p className="number">{item.number}</p>
            </div>
          ))}
        </section>

        {/* Users List Section */}
        <section className="usersList">
          <div className="contentWrapper">
            <div className="headers">
              {/* Displaying the filter tabs for user data */}
              {dataHeaders.map((item) => (
                <span key={item}>
                  <h4>{item}</h4>
                  <span
                    onClick={() => {
                      setOpenFilter(!openFilter)
                      setFilterIconId(item)
                    }}
                  >
                    <Icon filename="filter-results-button.svg" />
                  </span>
                  {openFilter && item === filterIconId ? (
                    <FilterUserList
                      onFilter={filterFunction}
                      onReset={resetFilter}
                    />
                  ) : null}
                </span>
              ))}
            </div>
            {/* Displaying each user in the users list */}
            {filteredValues?.map((item) => (
              <div className="singleUser" key={item.id}>
                <ul>
                  <li>{item.organization}</li>
                  <li>{item.username}</li>
                  <li className="email">{item.email}</li>
                  <li>{item.phone_number}</li>
                  <li>{item.date_joined}</li>
                  <li className={`statusPill ${item.status.toLowerCase()}`}>
                    {item.status}
                  </li>
                  {/* View more options icon */}
                  <span
                    className="viewMoreOptions"
                    onClick={() => {
                      setOpenDetailsDialog(!openDetailsDialog)
                      setUserId(item.id)
                    }}
                  >
                    <Icon filename="vertical-dots.svg" />
                  </span>
                </ul>
                {/* More options dialog for the user */}
                {openDetailsDialog && userId === item.id ? (
                  <span className="moreOptionsDialog">
                    <Link href={`/dashboard/${userId}`}>
                      <Icon filename="np-view.svg" />
                      <p>View Details</p>
                    </Link>
                    <Link href={`/#`}>
                      <Icon filename="np-user.svg" />
                      <p>Blacklist User</p>
                    </Link>
                    <Link href={`/#`}>
                      <Icon filename="np-delete-friend.svg" />
                      <p>Activate User</p>
                    </Link>
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
