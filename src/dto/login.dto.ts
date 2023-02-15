import { IServerResponse, IUser } from '../interfaces'

interface Response {
  user: UserDto
  token: string
}

export type UserDto = Omit<IUser, 'password'>

export type LoginDto = Omit<IUser, 'id'>

interface Data extends IServerResponse {
  response: Response
}

export interface ILoginDto {
  data: Data
}
