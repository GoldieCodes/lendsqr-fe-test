import { render, screen, fireEvent } from "@testing-library/react"
import TopNav from "../app/components/TopNav"
import "@testing-library/jest-dom"
import React from "react"
import MenuContextProvider from "../app/dashboard/layout"

// Mock usePathname from next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}))

describe("TopNav Component", () => {
  beforeEach(() => {
    // Define what usePathname should return
    require("next/navigation").usePathname.mockReturnValue("/dashboard")
  })

  it("renders TopNav component", () => {
    const { getByTestId } = render(
      <MenuContextProvider>
        <TopNav />
      </MenuContextProvider>
    )
    expect(getByTestId("top-nav")).toBeInTheDocument()
  })
})
