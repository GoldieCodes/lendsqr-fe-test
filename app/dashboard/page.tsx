"use client" // Indicating that this component can use React hooks
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  UsersInterface,
  UserListType,
} from "../components/userDetailsInterface"
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
  const [users, setUsers] = useState<UsersInterface | null>(null) // Holds the list of users

  //the augmentedUsersList used to perform other operations on the user list data, so as to preserve the
  //original "users" variable in case of the need for a reset.
  const [augmentedUsersList, setAugmentedUsersList] =
    useState<UsersInterface | null>(users)

  // these two state variables are for pagination controls
  const [currentPage, setCurrentPage] = useState(1)
  const [pagesArray, setPagesArray] = useState([currentPage])
  const rowsPerPage = 50
  const [canGetNextPage, setCanGetNextPage] = useState(true)
  const [canGetPreviousPage, setCanGetPreviousPage] = useState(false)

  // Fetch data on component mount
  useEffect(() => {
    const storedData = checkStorageData<UserListType>(
      "usersList",
      "usersListTimeStamp",
      currentPage,
      rowsPerPage
    ) // Check local storage for user data
    if (storedData) {
      const [completeData, paginatedData] = storedData
      setUsers(completeData)
      setAugmentedUsersList(paginatedData)
      // Set both states if data is found in storage
    } else {
      fetchData() // If no data is found, fetch from API
    }

    async function fetchData() {
      const data = await fetchApiData<UserListType>(
        "https://run.mocky.io/v3/34ecde44-8db0-4c51-ac89-8cfb9ab57d07",
        "usersList",
        "usersListTimeStamp",
        currentPage,
        rowsPerPage
      )
      if (data) {
        const [completeData, paginatedData] = data
        setUsers(completeData)
        setAugmentedUsersList(paginatedData) // Update both states with fetched data
      }
    }
  }, [currentPage])

  // Filter users based on provided filter fields
  function filterFunction(filterFields: FilterValues) {
    const filterList: UsersInterface | null =
      augmentedUsersList?.filter(
        (field) =>
          // Match fields with the filter values
          field.date_joined?.match(filterFields.date) &&
          field.email?.match(filterFields.email) &&
          field.organization?.match(filterFields.organization) &&
          field.phone_number?.match(filterFields.phoneNumber) &&
          field.status?.match(filterFields.status) &&
          field.username?.match(filterFields.username)
      ) || null

    setAugmentedUsersList(filterList)
    setOpenFilter(false) // Close filter options after applying

    // State when no matching users found after filtering
    if (!augmentedUsersList)
      return <div className="noFilterValue">No Match Found</div>
  }

  // Reset filters to show all users
  function resetFilter() {
    setAugmentedUsersList(users)
    setOpenFilter(false) // Close filter options
  }

  if (!users) return // Loading state when users data is not available
  ;<div className="loading">
    <div className="loader"></div>
    <p>Loading...</p>
  </div>

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
            {augmentedUsersList?.map((item) => (
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
        <Pagination
          data={users}
          offset={rowsPerPage}
          currentPage={currentPage}
          pagesArray={pagesArray}
          setCurrentPage={setCurrentPage}
          setPagesArray={setPagesArray}
          canGetNextPage={canGetNextPage}
          setCanGetNextPage={setCanGetNextPage}
          canGetPreviousPage={canGetPreviousPage}
          setCanGetPreviousPage={setCanGetPreviousPage}
        />
      </main>
    </div>
  )
}
