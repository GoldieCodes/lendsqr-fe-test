"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { UsersListType } from "../components/userDetailsInterface"
import Icon from "../components/Icon"
import Link from "next/link"
import FilterUserList from "../components/FilterUserList"
import { FilterValues } from "../components/FilterUserList"

const dashbOverview = [
  { icon: "/np_2users.svg", text: "Users", number: "2,453" },
  { icon: "/np_3users.svg", text: "Active users", number: "2,453" },
  { icon: "/np_loan.svg", text: "Users with loans", number: "12,453" },
  { icon: "/np_money.svg", text: "Users with savings", number: "102,453" },
]

const dataHeaders = [
  "organization",
  "username",
  "email",
  "phone number",
  "date joined",
  "status",
]

export default function Dashboard() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>()
  const [userId, setUserId] = useState<string>()
  const [openFilter, setOpenFilter] = useState(false)
  const [filterIconId, setFilterIconId] = useState<string>()
  const [users, setUsers] = useState<UsersListType | null>(() =>
    initFetchData()
  )
  const [filteredValues, setFilteredValues] = useState<UsersListType | null>(
    users
  )

  async function fetchData() {
    try {
      const response = await fetch(
        "https://run.mocky.io/v3/9537c251-a8a6-44f8-8563-f0ff9eede120"
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data: UsersListType = await response.json()
      localStorage.setItem("users", JSON.stringify(data))
      localStorage.setItem("userFetchTimestamp", Date.now().toString())
      setUsers(data)
      setFilteredValues(data)
    } catch (error) {
      throw new Error("Data fetch could not complete")
    }

    // let pages: number | null = users?.length / 50
    // do
    //   while (pages){
    // const r = new URL(
    //   "https://run.mocky.io/v3/9537c251-a8a6-44f8-8563-f0ff9eede120"
    //     )
    //     pages--
    //   }
  }

  useEffect(() => {
    if (!users) {
      fetchData()
    }
  }, [users])

  function filterFunction(filterFields: FilterValues) {
    const filteredValues: UsersListType | null =
      users?.filter(
        (field) =>
          field.date_joined?.match(filterFields.date) &&
          field.email?.match(filterFields.email) &&
          field.organization?.match(filterFields.organization) &&
          field.phone_number?.match(filterFields.phoneNumber) &&
          field.status?.match(filterFields.status) &&
          field.username?.match(filterFields.username)
      ) || null

    setFilteredValues(filteredValues)
    setOpenFilter(false)
  }

  function resetFilter() {
    setFilteredValues(users)
    setOpenFilter(false)
  }

  if (!users)
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    )
  if (!filteredValues)
    return <div className="noFilterValue">No Match Found</div>

  return (
    <div className="dashbContentWrapper">
      <main className="dashboardContentBody">
        <h1>Users</h1>
        <section className="overview">
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

        {/* USERS LIST */}

        <section className="usersList">
          <div className="contentWrapper">
            <div className="headers">
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
                  {openFilter && item == filterIconId ? (
                    <FilterUserList
                      onFilter={filterFunction}
                      onReset={resetFilter}
                    />
                  ) : null}
                </span>
              ))}
            </div>
            {/* THIS IS FOR EACH USER ON THE USERS PAGE */}
            {filteredValues?.map((item) => (
              <div className="singleUser" key={item.id}>
                <ul>
                  <li>{item.organization}</li> <li>{item.username}</li>
                  <li className="email">{item.email}</li>{" "}
                  <li>{item.phone_number}</li>
                  <li>{item.date_joined}</li>
                  <li className={`statusPill ${item.status.toLowerCase()}`}>
                    {item.status}
                  </li>
                  {/* THIS IS THE THREE DOTS ICON AND THE DIALOG BOX THAT COMES UP WHENEVER THE DOTS ARE CLICKED */}
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

function initFetchData() {
  const refreshRate = 100 * 60 * 60 * 24
  const data = localStorage.getItem("users")
  const dataStamptime = localStorage.getItem("userFetchTimestamp")
  if (data && dataStamptime) {
    const parseData = JSON.parse(data)
    const parseTime = parseInt(dataStamptime, 10)
    const timeNow = Date.now()

    if (timeNow - parseTime < refreshRate) return parseData
    else return null
  }
}
