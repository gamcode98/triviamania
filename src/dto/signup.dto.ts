import { IServerResponse, IUser } from '../interfaces'

export type UserDto = Omit<IUser, 'password'>

interface Data extends IServerResponse {
  response: UserDto
}

export type SignupDto = Pick<IUser, 'email' | 'password'>

export interface ISignupDto {
  data: Data
}
