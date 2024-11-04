"use client"
import React, { useState } from "react"
import { Status, Organization } from "./userDetailsInterface"

interface FilterFormProps {
  onFilter: (filters: {
    organization: string
    username: string
    email: string
    date: string
    phoneNumber: string
    status: string
  }) => void
  onReset: () => void
}

export interface FilterValues {
  organization: string
  username: string
  email: string
  date: string
  phoneNumber: string
  status: string
}

const FilterUserList: React.FC<FilterFormProps> = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState<FilterValues>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const handleFilter = () => {
    onFilter(filters)
  }

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
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={filters.username}
        onChange={handleChange}
        placeholder="User"
        className="form-input"
      />
      <label htmlFor="Email">Email</label>
      <input
        type="email"
        name="email"
        value={filters.email}
        onChange={handleChange}
        placeholder="Email"
        className="form-input"
      />
      <label htmlFor="date">Date</label>
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="form-input"
      />
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="tel"
        name="phoneNumber"
        value={filters.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="form-input"
      />
      <label htmlFor="status">Status</label>
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="form-input"
      >
        <option value="">Select</option>
        <option value="Active">{Status.Active}</option>
        <option value="Inactive">{Status.Inactive}</option>
        <option value="Pending">{Status.Pending}</option>
        <option value="Blacklisted">{Status.Blacklisted}</option>
      </select>

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

export default FilterUserList
