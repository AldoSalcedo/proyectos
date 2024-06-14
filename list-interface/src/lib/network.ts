import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { logger } from './logger'

const BASE_URL = import.meta.env.VITE_ASSET_URL || 'https://fakestoreapi.com'

logger.log('BASE_URL', BASE_URL)

const client = axios.create({
  baseURL: BASE_URL,
})

export const request = async <T = unknown>(
  options: AxiosRequestConfig,
  getFullResponse: boolean = false
): Promise<T> => {
  /*  let token
     const state = store.getState()
     const userState = state?.user?.currentUser
     if (userState === null) {
         token = ""
     }
     else {
         const { accessToken } = userState
         token = accessToken
     }
     // Set the authorization header
     token !== "" && (client.defaults.headers.common.Authorization = `Bearer ${token}`); */

  const onSuccess = (response: AxiosResponse): T => {
    if (response.status === 204) {
      return null as unknown as T
    }
    if (getFullResponse) {
      return response.data as unknown as T
    }
    return response.data
  }

  const onError = (error: any) => {
    // Si el error es por falta de autorización, se intenta renovar el token
    if (error.response?.status === 401) {
      request({
        url: '/auth/renew-token',
        method: 'POST',
      }).then(() => {
        return client(options).then(onSuccess).catch(onError)
      })
    }

    return Promise.reject(error.response?.data)
  }

  return client(options).then(onSuccess).catch(onError)
}

export const unprotectedRequest = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    return response.data
  }

  const onError = (error: any) => {
    return Promise.reject(error.response?.data)
  }

  return client(options).then(onSuccess).catch(onError)
}

export const download = async (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    return response
  }

  const onError = (error: any) => {
    if (error.response?.status === 401) {
      request({
        url: '/auth/renew-token',
        method: 'POST',
      }).then(() => {
        return client(options).then(onSuccess).catch(onError)
      })
    }
    return Promise.reject(error.response?.data)
  }

  return client(options).then(onSuccess).catch(onError)
}
