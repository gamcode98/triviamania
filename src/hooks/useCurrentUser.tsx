import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { UserDto } from '../dto/login.dto'

interface IUserContext {
  currentUser: UserDto | null
  setCurrentUser: (user: UserDto | null) => void
}

export default (): IUserContext => useContext(UserContext)
