import axios, { AxiosError, AxiosResponse } from 'axios'

const API_ENDPOINT = process.env.REACT_APP_API_URL

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async (request: any) => {
    // const token = await StorageService.getAuthToken();

    // if (token) {
    //   request.headers = { ...request.headers, authorization: `Bearer ${token}` };
    // } else {
    //   request.headers = { ...request.headers, authorization: request?.headers?.authorization! || "" };
    // }

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
      //   store?.dispatch(logOutAction());
    }
    return Promise.reject(error)
  },
)

export default apiClient
