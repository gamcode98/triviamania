import axios from 'axios'
import { ISaveResultDto } from '../dto/saveResult.dto'

const baseURL: string = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({ baseURL })

const getTokenStored = (): string => {
  const tokenStored: any = localStorage.getItem('token')

  const tokenParsed: string = JSON.parse(tokenStored)

  return tokenParsed
}

const saveResult = async (data: ISaveResultDto): Promise<any> => {
  const url = `${baseURL}/results/save-result`

  const token = getTokenStored()

  console.log({ token })

  if (token === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export { saveResult }
