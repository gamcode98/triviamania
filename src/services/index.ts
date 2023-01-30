import axios from 'axios'
import { ICategories } from '../interfaces/ICategories'

const baseURL: string = import.meta.env.VITE_DOMAIN_URL

const instance = axios.create({ baseURL })

const getCategories = async (progressFn?: any): Promise<ICategories> => {
  const url = `${baseURL}/categories`

  return await instance.get(url, {
    onDownloadProgress: progressFn
  })
}

const getQuestions = async (url: string, progressFn?: any): Promise<any> => {
  return await instance.get(url, {
    onDownloadProgress: progressFn
  })
}

export { getCategories, getQuestions }
