import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import apiClient from '../../config/api-client'
import { IStaff } from '../../types/staff'

interface IStaffsStore {
  error: string
  staffs: IStaff[]
  page: number
  count: number
  hasMore: boolean
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
}

type FetchStaffsActionParam = {
  page?: number
  limit?: string
}

const name = 'Staffs'
const initialState: IStaffsStore = {
  error: '',
  staffs: [],
  page: 0,
  hasMore: false,
  count: 0,
  requestStatus: 'idle',
}

// Async redux action: Fetch Staffs.
export const fetchStaffs = createAsyncThunk<any, FetchStaffsActionParam>(
  `${name}/fetchStaffs`,
  async ({ page = 1 }) => {
    // Note: To implement search, first check if the search query will be found in the staffs store array
    // before making an api call with the search query!
    const result = await apiClient.get(`/users/all?page=${page}`)
    return result.data
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
      state.staffs = action.payload?.data
      state.page = action.payload?.page
      state.hasMore = state.staffs?.length < action.payload?.count
      state.count = action.payload?.count
    })
  },
})

export const { moreStaffsAction } = StaffsSlice.actions
export const selectStaffs = (store: any) => store.Staffs as IStaffsStore
export default StaffsSlice.reducer
