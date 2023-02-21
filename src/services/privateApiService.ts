import { AxiosResponse } from 'axios'
import { backendApi, getHeaders, handleError, handleResponse } from '.'

type Url =
  '/results/save-result' |
  '/results/?limit=10&offset=0' |
  '/users/change-password' |
  '/users'

const post = async <T, U>(url: Url, data: T): Promise<AxiosResponse<U>> => {
  return await
  backendApi.post(url, data, getHeaders())
    .then(handleResponse)
    .catch(handleError)
}

const patch = async <T, U>(url: Url, data: T): Promise<AxiosResponse<U>> => {
  return await
  backendApi.patch(url, data, getHeaders())
    .then(handleResponse)
    .catch(handleError)
}

const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  return await
  backendApi.get(url, getHeaders())
    .then(handleResponse)
    .catch(handleError)
}

const remove = async <T>(url: Url): Promise<AxiosResponse<T>> => {
  return await
  backendApi.delete(url, getHeaders())
    .then(handleResponse)
    .catch(handleError)
}

export { post, patch, get, remove }
