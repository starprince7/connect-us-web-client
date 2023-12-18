export const SESSION_KEY = 'connect-us-session'
export const ADMIN_USER_KEY = 'admin-user-id'

export const setAuthToken = (token: string): void => {
  localStorage.setItem(SESSION_KEY, token)
}

export const getAuthToken = () => {
  return localStorage.getItem(SESSION_KEY) || null
}

export const removeAuthToken = (): void => {
  localStorage.removeItem(SESSION_KEY)
}

const setAdminId = (id: string) => {
  localStorage.setItem(ADMIN_USER_KEY, id)
}

const removeAdminId = () => {
  localStorage.removeItem(ADMIN_USER_KEY)
}

const getAdminId = () => {
  return localStorage.getItem(ADMIN_USER_KEY) || null
}

export const StorageService = {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  setAdminId,
  getAdminId,
  removeAdminId,
}
