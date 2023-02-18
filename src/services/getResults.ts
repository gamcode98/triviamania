import axios from 'axios'
import { Data } from '../dto/result.dto'

const baseURL: string = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({ baseURL })

const getTokenStored = (): string => {
  const tokenStored: any = localStorage.getItem('token')

  const tokenParsed: string = JSON.parse(tokenStored)

  return tokenParsed
}

interface FailedToken {
  data: {
    failed: boolean
    message: string
  }
}

const getResults = async (nextUrl?: string): Promise<Data | FailedToken> => {
  const url = `${baseURL}/results/?limit=10&offset=0`

  const token = getTokenStored()

  if (token === null) {
    return {
      data: {
        failed: true,
        message: 'You must provide a token'
      }
    }
  }

  return await instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export { getResults }
