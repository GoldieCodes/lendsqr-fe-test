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
