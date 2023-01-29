import { createContext, useState } from 'react'
import { IUser } from '../interfaces/IUser'

interface IUserContext {
  currentUser: IUser | null
  setCurrentUser: (user: IUser | null) => void
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {}
})

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  const value: IUserContext = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
