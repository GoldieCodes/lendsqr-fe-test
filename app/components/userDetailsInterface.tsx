interface ProfileSummary {
  name: string
  user_id: string
  user_tier: number
  account_balance: string
  account_number: string
  bank_name: string
}

interface PersonalInformation {
  label: string
  value: string
}

interface EducationAndEmployment {
  label: string
  value: string
}

interface Social {
  label: string
  value: string
}

interface Guarantor {
  label: string
  value: string
}

export interface UserDetailsResponse {
  profile_summary: ProfileSummary
  personal_information: PersonalInformation[]
  education_and_employment: EducationAndEmployment[]
  socials: Social[]
  guarantor: Guarantor[]
}

//user list interface
export type UsersListType = UsersInterface[]

export interface UsersInterface {
  id: string
  organization: Organization
  username: string
  email: string
  phone_number: string
  date_joined: string
  status: Status
}

export enum Organization {
  FinCare = "FinCare",
  FundNow = "FundNow",
  Lendsqr = "Lendsqr",
  MoneyTrust = "MoneyTrust",
  QuickFunds = "QuickFunds",
}

export enum Status {
  Active = "Active",
  Blacklisted = "Blacklisted",
  Inactive = "Inactive",
  Pending = "Pending",
}
