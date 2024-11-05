// THIS DEFINES THE EXPECTED TYPE FOR THE USER DETAILS FETCH
export type UserDetailsResponse = CompleteUserInfo[]

// Interface representing the complete user information response structure
interface CompleteUserInfo {
  profile_summary: ProfileSummary // Summary of the user's profile
  personal_information: PersonalInformation[] // Array of personal information entries
  education_and_employment: EducationAndEmployment[] // Array of education and employment entries
  socials: Social[] // Array of social media links
  guarantor: Guarantor[] // Array of guarantor information
}

// Interface defining the structure of the user's profile summary
interface ProfileSummary {
  name: string
  user_id: string // Unique identifier for the user
  user_tier: number
  account_balance: string
  account_number: string
  bank_name: string
}

// Interface defining the structure of personal information
interface PersonalInformation {
  label: string // Label for the information (e.g., "Date of Birth")
  value: string // Value corresponding to the label
}

// Interface defining the structure of education and employment details
interface EducationAndEmployment {
  label: string // Label for the education or employment information
  value: string // Value corresponding to the label
}

// Interface defining the structure of social media links
interface Social {
  label: string // Label for the social media platform (e.g., "LinkedIn")
  value: string // Link to the user's social media profile
}

// Interface defining the structure of guarantor information
interface Guarantor {
  label: string // Label for the guarantor information
  value: string // Value corresponding to the label
}

// USER DETAILS TYPE ENDS

// THIS DEFINES THE EXPECTED TYPE FOR THE USER LIST FETCH
export type UsersListType = UsersInterface[] // Array of user interfaces

// Interface defining the structure of a user in the user list
export interface UsersInterface {
  id: string // Unique identifier for the user
  organization: Organization // Organization the user belongs to
  username: string // Username of the user
  email: string // Email address of the user
  phone_number: string // Phone number of the user
  date_joined: string // Date the user joined
  status: Status // Current status of the user
}

// Enum defining possible organizations
export enum Organization {
  FinCare = "FinCare",
  FundNow = "FundNow",
  Lendsqr = "Lendsqr",
  MoneyTrust = "MoneyTrust",
  QuickFunds = "QuickFunds",
}

// Enum defining possible user statuses
export enum Status {
  Active = "Active",
  Blacklisted = "Blacklisted",
  Inactive = "Inactive",
  Pending = "Pending",
}
// USER LIST TYPE ENDS
