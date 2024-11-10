import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import TopNav from "../app/components/TopNav"
import "@testing-library/jest-dom"
import React from "react"
import { useMenuContextProvider } from "../app/contextAPIs/MenuContextProvider"
import { usePathname } from "next/navigation"

// Mock usePathname from next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/dashboard"),
}))

jest.mock("../app/contextAPIs/MenuContextProvider", () => ({
  useMenuContextProvider: jest.fn(),
}))

describe("TopNav Component", () => {
  const mockContextProps = {
    users: [
      {
        id: 1,
        organization: "MoneyTrust",
        username: "User1",
        email: "user1@example.com",
        phone_number: "123-456-7898",
        date_joined: "2023-01-01",
        status: "Active",
      },
      {
        id: 2,
        organization: "Lendsqr",
        username: "Martha",
        email: "user2@example.com",
        phone_number: "654-321-0098",
        date_joined: "2023-02-01",
        status: "Inactive",
      },
    ],
    mobileMenuOpen: false,
    search: "", // to check that the mock initial value is passed
    setAugmentedUsersList: jest.fn(),
    setMobileMenuOpen: jest.fn(),
    setSearch: jest.fn((newSearch) => {
      mockContextProps.search = newSearch
    }),
  }
  beforeEach(() => {
    ;(useMenuContextProvider as jest.Mock).mockReturnValue(mockContextProps)
    ;(usePathname as jest.Mock).mockReturnValue("/dashboard")
    jest.clearAllMocks()
  })

  it("renders TopNav component and receives its props", () => {
    render(<TopNav />)

    const searchBar = screen.getByPlaceholderText("Search for anything")
    expect(searchBar).toHaveValue("") //checking if initial value was passed

    // checking if the setMobileMenuOpen function gets called and set appropriately with onClick event
    const iconWhenMenuIsClosed = screen.getByTestId(/menuIsNotOpen/i)
    fireEvent.click(iconWhenMenuIsClosed)
    expect(mockContextProps.setMobileMenuOpen).toHaveBeenCalledWith(true)

    expect(mockContextProps.setAugmentedUsersList).toHaveBeenCalledWith(
      mockContextProps.users.slice(0, 50)
    )
  })

  it("filters users based on search input when on dashboard", async () => {
    const { rerender } = render(<TopNav />)
    const searchBar = screen.getByPlaceholderText("Search for anything")

    fireEvent.change(searchBar, { target: { value: "martha" } })
    expect(mockContextProps.setSearch).toHaveBeenCalledWith("martha")
    expect(mockContextProps.search).toBe("martha")
    //the component has to be rerendered to resemble the useEffect rerender behaviour which is what triggers the filtering
    rerender(<TopNav />)
    expect(mockContextProps.setAugmentedUsersList).toHaveBeenCalledWith([
      mockContextProps.users[1],
    ])
  })

  it("displays all users when search input is cleared", () => {
    const { rerender } = render(<TopNav />)
    const searchBar = screen.getByPlaceholderText("Search for anything")

    // Negative scenario: When search is empty, it should return a default set of users
    fireEvent.change(searchBar, { target: { value: "" } })
    expect(mockContextProps.search).toBe("")

    //the component has to be rerendered to resemble the useEffect rerender behaviour which is what triggers the filtering

    rerender(<TopNav />)
    expect(mockContextProps.setAugmentedUsersList).toHaveBeenCalledWith(
      mockContextProps.users.slice(0, 50)
    )
  })

  it("does not filter users if not on dashboard page", () => {
    ;(usePathname as jest.Mock).mockReturnValue("/dashboard/1")
    render(<TopNav />)
    const searchBar = screen.getByPlaceholderText("Search for anything")

    fireEvent.change(searchBar, { target: { value: "User1" } })

    // Negative scenario: No filtering should occur on non-dashboard pages

    expect(mockContextProps.setAugmentedUsersList).not.toHaveBeenCalled()
  })
})
