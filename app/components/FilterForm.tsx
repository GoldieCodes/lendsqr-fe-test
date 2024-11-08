"use client"
import React, { useState } from "react"
import { Status, Organization } from "./userDetailsInterface"

// Define the structure of the props passed to the FilterForm component
interface FilterFormProps {
  // Function to handle filter action with filter values as a parameter
  onFilter: (filters: {
    organization: string
    username: string
    email: string
    date: string
    phoneNumber: string
    status: string
  }) => void
  // Function to handle reset action
  onReset: () => void
}

// Interface defining the filter values structure
export interface FilterValues {
  organization: string
  username: string
  email: string
  date: string
  phoneNumber: string
  status: string
}

// Component for filtering a user list based on various criteria
const FilterForm: React.FC<FilterFormProps> = ({ onFilter, onReset }) => {
  // State to store filter values
  const [filters, setFilters] = useState<FilterValues>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  })

  // Event handler for input and select field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    // Update the state with new filter values
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }
  const handlePhoneNumberFormat = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target
    value.replace(/\D/g, "")

    // Limit the input length to 10 digits
    if (value.length > 10) value = value.slice(0, 10)

    // Format the input as '525-402-2460'
    const formattedInput = value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")

    // Update the state with new filter values
    setFilters((prevFilters) => ({ ...prevFilters, [name]: formattedInput }))
  }

  // Trigger the onFilter function with the current filters
  const handleFilter = () => {
    onFilter(filters)
  }

  // Reset filter values and trigger the onReset function
  const handleReset = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    })
    onReset()
  }

  return (
    <div className="filter-form">
      {/* Organization filter */}
      <label htmlFor="organization">Organization</label>
      <select
        name="organization"
        value={filters.organization}
        onChange={handleChange}
        className="form-input"
      >
        <option value="">Select</option>
        <option value={Organization.Lendsqr}>{Organization.Lendsqr}</option>
        <option value={Organization.FinCare}>{Organization.FinCare}</option>
        <option value={Organization.FundNow}>{Organization.FundNow}</option>
        <option value={Organization.MoneyTrust}>
          {Organization.MoneyTrust}
        </option>
        <option value={Organization.QuickFunds}>
          {Organization.QuickFunds}
        </option>
      </select>

      {/* Username filter */}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={filters.username}
        onChange={handleChange}
        placeholder="User"
        className="form-input"
      />

      {/* Email filter */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={filters.email}
        onChange={handleChange}
        placeholder="e.g: janedoe@lendsqr.com"
        className="form-input"
      />

      {/* Date filter */}
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="form-input"
      />

      {/* Phone Number filter */}
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="tel"
        name="phoneNumber"
        value={filters.phoneNumber}
        onChange={handlePhoneNumberFormat}
        placeholder="XXX-XXX-XXXX"
        maxLength={12}
        className="form-input"
      />

      {/* Status filter */}
      <label htmlFor="status">Status</label>
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="form-input"
      >
        <option value="">Select</option>
        <option value={Status.Active}>{Status.Active}</option>
        <option value={Status.Inactive}>{Status.Inactive}</option>
        <option value={Status.Pending}>{Status.Pending}</option>
        <option value={Status.Blacklisted}>{Status.Blacklisted}</option>
      </select>

      {/* Action buttons for filtering and resetting */}
      <div className="form-buttons">
        <button type="button" onClick={handleReset} className="reset-button">
          Reset
        </button>
        <button type="button" onClick={handleFilter} className="filter-button">
          Filter
        </button>
      </div>
    </div>
  )
}

export default FilterForm
