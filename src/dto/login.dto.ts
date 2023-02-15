import { IServerResponse, IUser } from '../interfaces'

interface Response {
  user: UserDto
  token: string
}

export type UserDto = Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>

export type LoginDto = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>

interface Data extends IServerResponse {
  response: Response
}

export interface ILoginDto {
  data: Data
}
