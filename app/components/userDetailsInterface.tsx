// THIS DEFINES THE EXPECTED TYPE FOR THE USER DETAILS FETCH
export type UserDetailsResponse = CompleteUserInfo[]

// Interface representing the complete user information response structure
export interface CompleteUserInfo {
  username: string
  user_id: string
  user_tier: number
  account_balance: string
  account_number: number
  bank_name: BankName
  personal_information: PersonalInformation
  education_and_employment: EducationAndEmployment
  socials: Socials
  guarantor: Guarantor
}

export enum BankName {
  GoldenGateCreditUnion = "Golden Gate Credit Union",
  MountainViewSavings = "Mountain View Savings",
  OceanBreezeFinancial = "Ocean Breeze Financial",
  PineTreeNationalBank = "Pine Tree National Bank",
  SunsetBank = "Sunset Bank",
}

export interface EducationAndEmployment {
  level_of_education: LevelOfEducation
  employment_status: EmploymentStatus
  sector_of_employment: SectorOfEmployment
  duration_of_employment: DurationOfEmployment
  office_email: string
  monthly_income: string
  loan_repayment: number
}

export enum DurationOfEmployment {
  The1Year = "1 year",
  The2Months = "2 months",
  The3Years = "3 years",
  The4Years = "4 years",
  The5Years = "5 years",
  The6Months = "6 months",
}

export enum EmploymentStatus {
  Contractor = "contractor",
  Employed = "employed",
  Entrepreneur = "entrepreneur",
  Freelancer = "freelancer",
  PartTime = "part-time",
  Retired = "retired",
  SelfEmployed = "self-employed",
  Student = "student",
  TemporarilyLaidOff = "temporarily laid off",
  Unemployed = "unemployed",
}

export enum LevelOfEducation {
  AssociateSDegree = "Associate's Degree",
  BachelorSDegree = "Bachelor's Degree",
  Ged = "GED",
  HighSchoolDiploma = "High School Diploma",
  MasterSDegree = "Master's Degree",
  NoFormalEducation = "No Formal Education",
  PhD = "PhD",
  ProfessionalCertification = "Professional Certification",
  SomeCollege = "Some College",
  TradeSchoolCertification = "Trade School Certification",
}

export enum SectorOfEmployment {
  Construction = "Construction",
  Education = "Education",
  Finance = "Finance",
  Healthcare = "Healthcare",
  Hospitality = "Hospitality",
  Manufacturing = "Manufacturing",
  Media = "Media",
  Retail = "Retail",
  Technology = "Technology",
  Transportation = "Transportation",
}

export interface Guarantor {
  full_name: string
  phone_number: string
  email_address: string
  relationship: Relationship
}

export enum Relationship {
  Aunt = "aunt",
  Cousin = "cousin",
  Grandparent = "grandparent",
  InLaw = "in-law",
  Nephew = "nephew",
  Niece = "niece",
  Parent = "parent",
  Sibling = "sibling",
  StepParent = "step-parent",
  Uncle = "uncle",
}

export interface PersonalInformation {
  full_name: string
  phone_number: string
  email_address: string
  bvn: string
  gender: Gender
  marital_status: MaritalStatus
  children: string
  type_of_residence: TypeOfResidence
}

export enum Gender {
  Agender = "Agender",
  Bigender = "Bigender",
  Female = "Female",
  Genderfluid = "Genderfluid",
  Genderqueer = "Genderqueer",
  Male = "Male",
  NonBinary = "Non-binary",
  Polygender = "Polygender",
}

export enum MaritalStatus {
  Divorced = "divorced",
  InARelationship = "in a relationship",
  Married = "married",
  Single = "single",
  Widowed = "widowed",
}

export enum TypeOfResidence {
  Cabin = "cabin",
  Condo = "condo",
  Duplex = "duplex",
  Houseboat = "houseboat",
  Loft = "loft",
  SharedApartment = "shared apartment",
  SingleFamilyHome = "single-family home",
  StudioApartment = "studio apartment",
  TinyHouse = "tiny house",
  Townhouse = "townhouse",
}

export interface Socials {
  twitter: string
  facebook: string
  instagram: string
}

// USER DETAILS TYPE ENDS

// THIS DEFINES THE EXPECTED TYPE FOR THE USER LIST FETCH
export type UsersInterface = UserListType[]

export interface UserListType {
  id: string
  organization: Organization
  username: string
  email: string
  phone_number: string
  date_joined: string
  status: Status
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
