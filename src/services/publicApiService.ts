import { AxiosResponse } from 'axios'
import { backendApi, triviaApi, handleError, handleResponse } from '.'
import { IQuestionsData, ISettings } from '../interfaces'

type AuthUrl = '/auth/login' | '/auth/register'

const post = async <T, U>(url: AuthUrl, data: T): Promise<AxiosResponse<U>> => {
  return await
  backendApi.post(url, data)
    .then(handleResponse)
    .catch(handleError)
}

const getQuestions = async (settings: ISettings, progressFn?: any): Promise<IQuestionsData> => {
  const { categories, limit, difficulty } = settings

  const stringOfCategories = categories.join()

  return await triviaApi.get(
    `/questions?categories=${stringOfCategories}&limit=${limit}&difficulty=${difficulty}`,
    { onDownloadProgress: progressFn })
}

export { post, getQuestions }
