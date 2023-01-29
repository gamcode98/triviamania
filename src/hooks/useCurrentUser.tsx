import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { IUser } from '../interfaces/IUser'

interface IUserContext {
  currentUser: IUser | null
  setCurrentUser: (user: IUser | null) => void
}

export default (): IUserContext => useContext(UserContext)
