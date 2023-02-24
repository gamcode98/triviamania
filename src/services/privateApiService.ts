import { AxiosResponse } from 'axios'
import { backendApi, handleError, handleResponse } from '.'

type Url =
  '/results/save-result' |
  '/results/?limit=10&offset=0' |
  '/users/change-password' |
  '/users' |
  '/auth/validate'

const post = async <T, U>(url: Url, data: T): Promise<AxiosResponse<U>> => {
  return await
  backendApi.post(url, data, { withCredentials: true })
    .then(handleResponse)
    .catch(handleError)
}

const patch = async <T, U>(url: Url, data: T): Promise<AxiosResponse<U>> => {
  return await
  backendApi.patch(url, data, { withCredentials: true })
    .then(handleResponse)
    .catch(handleError)
}

const get = async <T>(url: string | Url): Promise<AxiosResponse<T>> => {
  return await
  backendApi.get(url, { withCredentials: true })
    .then(handleResponse)
    .catch(handleError)
}

const remove = async <T>(url: Url): Promise<AxiosResponse<T>> => {
  return await
  backendApi.delete(url, { withCredentials: true })
    .then(handleResponse)
    .catch(handleError)
}

export { post, patch, get, remove }
