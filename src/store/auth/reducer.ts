import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser, LoginDto, UserDto } from '../../types/auth'
import toastService from '../../lib/toast-alert'
import apiClient from '../../config/api-client'
import { getFromUrl } from '../../lib/getUrlParam'

interface IAuthStore {
  error: string
  user: IUser | null
  isLoggedIn: boolean
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const name = 'auth'
const initialState: IAuthStore = {
  error: '',
  user: null,
  isLoggedIn: false,
  requestStatus: 'idle',
}

// Async redux action: register user
export const registerUser = createAsyncThunk<any, UserDto>(
  `${name}/registerUser`,
  async (registrationData) => {
    const registrationToken = getFromUrl('token')

    if (!registrationToken) return toastService.showInfoMessage('Invalid registration link')
    if (!registrationData) return toastService.showInfoMessage('No registration information')
    const result = await apiClient.post(
      `/users/signup?token=${registrationToken}`,
      registrationData,
    )
    return result.data
  },
)

export const logInUser = createAsyncThunk<any, LoginDto>(
  `${name}/logInUser`,
  async (logInCredential) => {
    if (!logInCredential) return toastService.showInfoMessage('Enter your login credentials')
    const result = await apiClient.post('/users/login', logInCredential)
    return result.data
  },
)

// Create slice.
const AuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    moreAuthAction: (state) => {},
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
      if (action.payload.error) {
        state.error = action.payload.error
        toastService.showErrorMessage(action.payload.error)
        return
      }
      state.user = action.payload.data
      state.requestStatus = 'succeeded'
      toastService.showSuccessMessage(action.payload.message)
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
      if (action.payload.error) {
        state.error = action.payload.error
        toastService.showErrorMessage(action.payload.error)
        return
      }
      state.user = action.payload.data
      state.requestStatus = 'succeeded'
      state.isLoggedIn = true
      toastService.showSuccessMessage(action.payload.message)
    })
  },
})

export const { moreAuthAction } = AuthSlice.actions
export const selectAuth = (store: any) => store.Auth as IAuthStore
export default AuthSlice.reducer
