import { IServerResponse, IUser } from '../interfaces'

interface Response {
  user: UserDto
}

export type UserDto = Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>

export type LoginDto = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>

export interface Data extends IServerResponse {
  response: Response
}
