import axios from 'axios'
import { ILoginDto, LoginDto } from '../dto/login.dto'

const baseURL: string = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({ baseURL })

const login = async (data: LoginDto): Promise<ILoginDto> => {
  const url = `${baseURL}/auth/login`

  return await instance.post(url, data)
}

export { login }
