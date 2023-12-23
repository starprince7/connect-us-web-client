import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import apiClient from '../../config/api-client'
import { IStaff } from '../../types/staff'
import toastService from '../../lib/toast-alert'

interface IStaffsStore {
  error: string
  staffs: IStaff[]
  staffsOnLeave: IStaff[]
  page: number
  pages: number
  count: number
  hasMore: boolean
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
}

interface GrantStaffLeaveRequestParam {
  email: string
}

type FetchStaffsActionParam = {
  page?: number
  limit?: string
}

const name = 'Staffs'
const initialState: IStaffsStore = {
  error: '',
  staffs: [],
  staffsOnLeave: [],
  page: 0,
  pages: 0,
  hasMore: false,
  count: 0,
  requestStatus: 'idle',
}

// Async redux action: Fetch staffsOnLeave.
export const fetchStaffs = createAsyncThunk<any, FetchStaffsActionParam>(
  `${name}/fetchStaffs`,
  async ({ page = 1 }) => {
    // Note: To implement search, first check if the search query will be found in the staffs store array
    // before making an api call with the search query!
    const result = await apiClient.get(`/users/all?page=${page}`)
    return result.data
  },
)

export const grantStaffLeaveOfAbsence = createAsyncThunk<any, GrantStaffLeaveRequestParam>(
  `${name}/grantStaffLeaveOfAbsence`,
  async ({ email }) => {
    try {
      const result = await apiClient.put(`/notice/leave`, { email })
      return result.data
    } catch (e: any) {
      return { error: e.response.data.error }
    }
  },
)

export const fetchStaffsOnLeave = createAsyncThunk<any, FetchStaffsActionParam>(
  `${name}/fetchStaffsOnLeave`,
  async ({ page, limit }) => {
    try {
      const result = await apiClient.get(`/users/leave?page=${page}`)
      return result.data
    } catch (e: any) {
      return { error: e.response.data.error }
    }
  },
)

export const endStaffLeave = createAsyncThunk<any, { id: string }>(
  `${name}/endStaffLeave`,
  async ({ id }) => {
    try {
      const result = await apiClient.put(`/notice/leave/${id}`)
      return result.data
    } catch (e: any) {
      return { error: e.response.data.error }
    }
  },
)

// Create slice.
const StaffsSlice = createSlice({
  name,
  initialState,
  reducers: {
    moreStaffsAction: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStaffs.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(fetchStaffs.rejected, (state, action) => {
      state.error = action.error.message!
      state.requestStatus = 'failed'
    })
    builder.addCase(fetchStaffs.fulfilled, (state, action) => {
      state.requestStatus = 'succeeded'
      state.staffs =
        action.payload?.page == 1
          ? action.payload?.data
          : [...state.staffs, ...(action.payload?.data ?? [])]
      state.page = action.payload?.page
      state.hasMore = Number(action.payload.pages) > Number(action.payload?.page)
    })
    //  Grant Staff Leave of Absence. POST
    builder.addCase(grantStaffLeaveOfAbsence.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(grantStaffLeaveOfAbsence.rejected, (state, action) => {
      state.error = action.error.message!
      state.requestStatus = 'failed'
    })
    builder.addCase(grantStaffLeaveOfAbsence.fulfilled, (state, action) => {
      if (action.payload?.error) {
        toastService.showErrorMessage(action.payload.error)
        state.requestStatus = 'failed'
        state.error = action.payload.error
        return
      }
      state.requestStatus = 'succeeded'
      toastService.showSuccessMessage(action.payload?.message)
    })
    // Fetch staffs on leave. GET
    builder.addCase(fetchStaffsOnLeave.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(fetchStaffsOnLeave.rejected, (state, action) => {
      state.error = action.error.message!
      state.requestStatus = 'failed'
    })
    builder.addCase(fetchStaffsOnLeave.fulfilled, (state, action) => {
      state.requestStatus = 'succeeded'
      state.staffsOnLeave = action.payload.data
      state.page = action.payload.page
      state.pages = action.payload.pages
      state.count = action.payload.count
    })
    // End Staff Leave
    builder.addCase(endStaffLeave.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(endStaffLeave.rejected, (state, action) => {
      state.error = action.error.message!
      state.requestStatus = 'failed'
    })
    builder.addCase(endStaffLeave.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.requestStatus = 'failed'
        state.error = action.payload.error
        toastService.showErrorMessage(action.payload.error)
        return
      }
      state.requestStatus = 'succeeded'
      state.staffsOnLeave = state.staffsOnLeave.filter((staff) => {
        const staffRemoved = action.payload.data as typeof staff
        return staff._id !== staffRemoved._id
      })
      toastService.showSuccessMessage(action.payload.message)
    })
  },
})

export const { moreStaffsAction } = StaffsSlice.actions
export const selectStaffs = (store: any) => store.Staffs as IStaffsStore
export default StaffsSlice.reducer
