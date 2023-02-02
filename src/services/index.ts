import axios from 'axios'
import { ICategories } from '../interfaces/ICategories'
import { IQuestionsData } from '../interfaces/IQuestions'
import { ISettings } from '../interfaces/ISettings'

const baseURL: string = import.meta.env.VITE_DOMAIN_URL

const instance = axios.create({ baseURL })

const getCategories = async (progressFn?: any): Promise<ICategories> => {
  const url = `${baseURL}/categories`

  return await instance.get(url, {
    onDownloadProgress: progressFn
  })
}

const getQuestions = async (settings: ISettings, progressFn?: any): Promise<IQuestionsData> => {
  const { categories, limit, difficulty } = settings

  const stringOfCategories = categories.join()

  return await instance.get(
    `/questions?categories=${stringOfCategories}&limit=${limit}&difficulty=${difficulty}`,
    { onDownloadProgress: progressFn })
}

export { getCategories, getQuestions }
