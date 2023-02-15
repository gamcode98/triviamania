import axios from 'axios'
import { ISignupDto, SignupDto } from '../dto/signup.dto'

const baseURL: string = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({ baseURL })

const signup = async (data: SignupDto): Promise<ISignupDto> => {
  const url = `${baseURL}/auth/register`

  return await instance.post(url, data)
}

export { signup }
