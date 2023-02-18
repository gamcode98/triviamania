import axios from 'axios'
import { IQuestionsData, ISettings } from './../interfaces'

interface Headers {
  headers: {
    Authorization: string
  }
}

interface Response {
  data?: unknown
  error?: unknown
}

export const getHeaders = (): Headers => {
  return {
    headers: {
      Authorization: getAuthorization()
    }
  }
}

const getAuthorization = (): string => {
  const token = localStorage.getItem('token')
  return `Bearer ${token}`
}

const baseURL: string = import.meta.env.VITE_DOMAIN_URL

const instance = axios.create({ baseURL })

const getQuestions = async (settings: ISettings, progressFn?: any): Promise<IQuestionsData> => {
  const { categories, limit, difficulty } = settings

  const stringOfCategories = categories.join()

  return await instance.get(
    `/questions?categories=${stringOfCategories}&limit=${limit}&difficulty=${difficulty}`,
    { onDownloadProgress: progressFn })
}

export { getQuestions }
