import axios, { AxiosError, AxiosResponse } from 'axios'
import { StorageService } from '../lib/storage'
import store from '../store'
import { logoutAction } from '../store/auth/reducer'

let API_ENDPOINT
if (!process.env.REACT_APP_API_URL)
  throw new Error(
    "Confirm 'REACT_APP_API_URL' is set in the environment variables; create one if it's not there",
  )

API_ENDPOINT = process.env.REACT_APP_API_URL

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async (request: any) => {
    const token = await StorageService.getAuthToken()

    // Attach token to make api request
    if (token) {
      request.headers = { ...request.headers, authorization: `Bearer ${token}` }
    } else {
      request.headers = {
        ...request.headers,
        authorization: request?.headers?.authorization || '',
      }
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  async (response: AxiosResponse<any, any>) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response?.status && error.response?.status === 401) {
      // store?.dispatch(logoutAction())
    }
    return Promise.reject(error)
  },
)

export default apiClient
