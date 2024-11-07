// import { render, screen, fireEvent } from "@testing-library/react"
// import TopNav from "../components/TopNav"
// import { useMenuContextProvider } from "../dashboard/layout"
// import { usePathname } from "next/navigation"
// import "@testing-library/jest-dom"

// // Mocking `useMenuContextProvider` and `usePathname` hook
// jest.mock("../dashboard/layout", () => ({
//   useMenuContextProvider: jest.fn(),
// }))
// jest.mock("next/navigation", () => ({
//   usePathname: jest.fn(),
// }))

// describe("The horizontal navigation bar", () => {
//   let mockContext

//   beforeEach(() => {
//     ;(mockContext = {
//       users: [
//         {
//           username: "User1",
//           email: "user1@example.com",
//           organization: "Org1",
//           phone_number: "123456",
//           status: "Active",
//           date_joined: "2023-01-01",
//         },
//         {
//           username: "User2",
//           email: "user2@example.com",
//           organization: "Org2",
//           phone_number: "654321",
//           status: "Inactive",
//           date_joined: "2023-02-01",
//         },
//       ],
//       augmentedUsersList: [],
//       setAugmentedUsersList: jest.fn(),
//       mobileMenuOpen: false,
//       setMobileMenuOpen: jest.fn(),
//       search: "",
//       setSearch: jest.fn(),
//     }),
//       (useMenuContextProvider as jest.Mock).mockReturnValue(mockContext),
//       (usePathname as jest.Mock).mockReturnValue("/dashboard")
//   })

//   afterEach(() => {
//     jest.clearAllMocks()
//   })

//   test("renders logo and search bar", () => {
//     render(<TopNav />)
//     expect(screen.getByAltText("Lendsqr logo")).toBeInTheDocument()
//     expect(screen.getByRole("textbox")).toBeInTheDocument()
//   })

//   test("toggles mobile menu on icon click", () => {
//     render(<TopNav />)
//     const menuIcon = screen.getByRole("button", { name: /menu/i })
//     fireEvent.click(menuIcon)
//     expect(mockContext.setMobileMenuOpen).toHaveBeenCalledWith(true)

//     // Negative Scenario: Clicking again should toggle it back
//     fireEvent.click(menuIcon)
//     expect(mockContext.setMobileMenuOpen).toHaveBeenCalledWith(false)
//   })

//   test("filters users based on search input when on dashboard", () => {
//     render(<TopNav />)
//     const searchInput = screen.getByRole("textbox")

//     fireEvent.change(searchInput, { target: { value: "User1" } })
//     expect(mockContext.setSearch).toHaveBeenCalledWith("User1")

//     // Simulate the effect hook running
//     expect(mockContext.setAugmentedUsersList).toHaveBeenCalledWith([
//       {
//         username: "User1",
//         email: "user1@example.com",
//         organization: "Org1",
//         phone_number: "123456",
//         status: "Active",
//         date_joined: "2023-01-01",
//       },
//     ])
//   })

//   test("displays all users when search input is cleared", () => {
//     render(<TopNav />)
//     const searchInput = screen.getByRole("textbox")

//     fireEvent.change(searchInput, { target: { value: "" } })
//     expect(mockContext.setSearch).toHaveBeenCalledWith("")

//     // Negative scenario: When search is empty, it should return a default set of users
//     expect(mockContext.setAugmentedUsersList).toHaveBeenCalledWith(
//       mockContext.users.slice(0, 50)
//     )
//   })

//   test("does not filter users if not on dashboard", () => {
//     ;(usePathname as jest.Mock).mockReturnValue("/other-page")
//     render(<TopNav />)
//     const searchInput = screen.getByRole("textbox")

//     fireEvent.change(searchInput, { target: { value: "User1" } })

//     // Negative scenario: No filtering should occur on non-dashboard pages
//     expect(mockContext.setAugmentedUsersList).not.toHaveBeenCalled()
//   })
// })
