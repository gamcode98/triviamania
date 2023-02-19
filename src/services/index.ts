import axios, { AxiosError, AxiosResponse } from 'axios'

interface Headers {
  headers: {
    Authorization: string | undefined
  }
}

const getHeaders = (): Headers => {
  return {
    headers: {
      Authorization: getAuthorization()
    }
  }
}

const getAuthorization = (): string | undefined => {
  const tokenStored = localStorage.getItem('token')
  if (tokenStored !== null) {
    const tokenParsed: string = JSON.parse(tokenStored)
    return `Bearer ${tokenParsed}`
  }
}

const handleResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const handleError = (error: AxiosError): never => {
  if (error.response) {
    // Request made and server responded
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
  throw error
}

const triviaUrl: string = import.meta.env.VITE_DOMAIN_URL
const backendUrl: string = import.meta.env.VITE_BACKEND_URL

const triviaApi = axios.create({ baseURL: triviaUrl })
const backendApi = axios.create({ baseURL: backendUrl })

export {
  getHeaders,
  handleError,
  handleResponse,
  backendApi,
  triviaApi
}
