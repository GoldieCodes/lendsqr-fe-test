import Login from "../app/page"
import "@testing-library/jest-dom"
import React from "react"
import { useRouter } from "next/navigation"
import {
  fireEvent,
  getByLabelText,
  render,
  screen,
  waitFor,
} from "@testing-library/react"

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("test the login form behaviour", () => {
  test("check that required fields are not bypassed", async () => {
    render(<Login />)

    //check that empty email field is not accepted
    const emailField = screen.getByLabelText("Email")
    expect(emailField).toBeInTheDocument()
    fireEvent.change(emailField, {
      target: { value: "" },
    })

    // mimic user clicking out of the date field which prompts the error to show
    fireEvent.blur(emailField)

    await waitFor(() => {
      expect(screen.getByText("This field is required")).toBeInTheDocument()
    })

    // check that empty password field is not accepted
    const passwordField = screen.getByLabelText("Password")
    expect(passwordField).toBeInTheDocument()
    fireEvent.change(passwordField, { target: { value: "" } })

    // mimic user clicking out of the date field which prompts the error to show
    fireEvent.blur(passwordField)

    await waitFor(() => {
      expect(screen.getByText("Please enter a password")).toBeInTheDocument()
    })
  })

  test("check that wrong input formats are not accepted", async () => {
    render(<Login />)
    const emailField = screen.getByLabelText("Email")
    expect(emailField).toBeInTheDocument()
    fireEvent.change(emailField, { target: { value: "onyinye@@gmail.com" } })

    // mimic user clicking out of the date field which prompts the error to show
    fireEvent.blur(emailField)

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument()
    })
    const passwordField = screen.getByLabelText("Password")
    expect(passwordField).toBeInTheDocument()
    fireEvent.change(passwordField, { target: { value: "1234t" } })

    // mimic user clicking out of the date field which prompts the error to show
    fireEvent.blur(passwordField)

    await waitFor(() => {
      expect(
        screen.getByText("Password should be at least 6 characters")
      ).toBeInTheDocument()
    })
  })

  test("check that create account button, creates and logs a user into the dashboard", async () => {
    render(<Login />)
    const emailField = screen.getByLabelText("Email")
    fireEvent.change(emailField, { target: { value: "og.udeozo@gmail.com" } })

    // mimic user clicking out of the date field which prompts the error to show
    fireEvent.blur(emailField)

    const passwordField = screen.getByLabelText("Password")
    fireEvent.change(passwordField, { target: { value: "1234tsehcvgbh" } })

    const loginButton = screen.getByRole("button", { name: /log in/i })
    fireEvent.click(loginButton)

    await waitFor(() => {
      const createAccountButton = screen.getByRole("button", {
        name: /create account/i,
      })
      expect(createAccountButton).toBeInTheDocument()
      fireEvent.click(createAccountButton)
    })
  })
})
