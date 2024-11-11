"use client"
import { createContext, useContext, useState } from "react"
import { UsersInterface } from "@/app/components/userDetailsInterface"

// TYPE DEFINITION FOR THE MENU CONTEXT PROPERTIES
interface MenuContextType {
  mobileMenuOpen: boolean
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  users: UsersInterface | null
  setUsers: React.Dispatch<React.SetStateAction<UsersInterface | null>>
  augmentedUsersList: UsersInterface | null
  setAugmentedUsersList: React.Dispatch<
    React.SetStateAction<UsersInterface | null>
  >
  rowsPerPage: number
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}

// CREATES A CONTEXT TO MANAGE STATE OF MOBILE MENU VISIBILITY ACROSS THE DASHBOARD COMPONENTS
export const MenuContext = createContext<MenuContextType | null>(null)

//THE CONTEXT PROVIDER WRAPPER
export const MenuContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // STATE TO CONTROL THE OPEN/CLOSED STATE OF THE MOBILE SIDEMENU
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [search, setSearch] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(50) //this controls the number of records shown at a time
  const [users, setUsers] = useState<UsersInterface | null>(null) // Holds the list of users

  //the augmentedUsersList used to perform other operations on the user list data, so as to preserve the
  //original "users" variable in case of the need for a reset.
  const [augmentedUsersList, setAugmentedUsersList] =
    useState<UsersInterface | null>(null)

  return (
    <MenuContext.Provider
      value={{
        mobileMenuOpen,
        setMobileMenuOpen,
        search,
        setSearch,
        users,
        setUsers,
        augmentedUsersList,
        setAugmentedUsersList,
        rowsPerPage,
        setRowsPerPage,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export function useMenuContextProvider() {
  const contextData = useContext(MenuContext)
  // checking that the context provider is not null before using it
  if (!contextData) {
    throw new Error(
      "The data you are trying to pull from your MenuContextProvider is presently null"
    )
  }
  return contextData
}
