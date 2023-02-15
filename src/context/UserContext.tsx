import { createContext, useState } from 'react'
import { UserDto } from '../dto/login.dto'

interface IUserContext {
  currentUser: UserDto | null
  setCurrentUser: (user: UserDto | null) => void
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {}
})

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null)

  const value: IUserContext = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
