import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, LoginDto, UserDto } from '../../types/auth'
import toastService from '../../lib/toast-alert'
import apiClient from '../../config/api-client'
import { getFromUrl } from '../../lib/getUrlParam'
import { StorageService } from '../../lib/storage'
import { redirect } from 'react-router-dom'

interface IAuthStore {
  error: string
  user: IUser
  isLoggedIn: boolean
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
}

interface GenerateSignUpLinkRequestParam {
  email: string
}

const name = 'auth'
const initialState: IAuthStore = {
  error: '',
  user: {
    _id: '',
    authority: 0,
    email: '',
    fullname: '',
    gender: '',
    leave: false,
    verified: false,
  },
  isLoggedIn: false,
  requestStatus: 'idle',
}

// Async redux action: register user
export const registerUser = createAsyncThunk<any, UserDto>(
  `${name}/registerUser`,
  async (registrationData) => {
    const registrationToken = getFromUrl('token')
    if (!registrationData) return toastService.showInfoMessage('No registration information')

    if (registrationToken || registrationData.adminKey) {
      const result = await apiClient.post(
        `/users/signup?token=${registrationToken}`,
        registrationData,
      )
      return result.data
    } else {
      return toastService.showInfoMessage('Invalid registration link')
    }
  },
)

export const logInUser = createAsyncThunk<any, LoginDto>(
  `${name}/logInUser`,
  async (logInCredential) => {
    if (!logInCredential) return toastService.showInfoMessage('Enter your login credentials')
    try {
      const result = await apiClient.post('/users/login', logInCredential)
      return result.data
    } catch (e: any) {
      return { error: `${e.response.status}: ${e.response?.data.error}` }
    }
  },
)

export const generateSignUpLink = createAsyncThunk<any, GenerateSignUpLinkRequestParam>(
  `${name}/generateSignUpLink`,
  async ({ email }) => {
    if (!email) return toastService.showInfoMessage('Enter your login credentials')
    const result = await apiClient.post('/admin/registration', { email })
    return result.data
  },
)

// Create slice.
const AuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.requestStatus = 'idle'
      state.user = {
        _id: '',
        authority: 0,
        email: '',
        fullname: '',
        gender: '',
        leave: false,
        verified: false,
      }
      state.error = ''
      state.isLoggedIn = false
      StorageService.removeAuthToken()
      window.location.assign('/login')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message!
      state.requestStatus = 'failed'
      toastService.showErrorMessage(action.error.message!)
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.error = action.payload?.error
        toastService.showErrorMessage(action.payload?.error)
        return
      }
      const userPayload = action.payload?.data as IUser
      if (userPayload && userPayload.verified) {
        state.requestStatus = 'succeeded'
        state.isLoggedIn = true
        state.user = userPayload
        toastService.showSuccessMessage(action.payload.message)
        StorageService.setAuthToken(action.payload.token)
        redirect('/teams')
      }
    })
    // => Login Async Reducer
    builder.addCase(logInUser.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(logInUser.rejected, (state, action) => {
      state.error = action.error.message!
      state.requestStatus = 'failed'
      toastService.showErrorMessage(action.error.message!)
    })
    builder.addCase(logInUser.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.requestStatus = 'failed'
        state.error = action.payload.error
        toastService.showErrorMessage(action.payload.error)
        return
      }
      state.user = action.payload?.data
      state.requestStatus = 'succeeded'
      state.isLoggedIn = true
      toastService.showSuccessMessage(action.payload.message)
      StorageService.setAuthToken(action.payload.token)
    })
    // *** Generate Sign up link
    builder.addCase(generateSignUpLink.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(generateSignUpLink.rejected, (state, action) => {
      state.error = action.error.message!
      state.requestStatus = 'failed'
      toastService.showErrorMessage(action.error.message!)
    })
    builder.addCase(generateSignUpLink.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error
        toastService.showErrorMessage(action.payload.error)
        return
      }
      state.user = action.payload.data
      state.requestStatus = 'succeeded'
      toastService.showSuccessMessage(action.payload.message)
    })
  },
})

export const { logoutAction } = AuthSlice.actions
export const selectAuth = (store: any) => store.Auth as IAuthStore
export default AuthSlice.reducer
