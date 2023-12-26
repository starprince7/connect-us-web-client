import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAppStore {
  error: string
  sideBarOpen: boolean
}

const name = 'app'
const initialState: IAppStore = {
  error: '',
  sideBarOpen: false,
}

// Create slice.
const AppSlice = createSlice({
  name,
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.sideBarOpen = action.payload
    },
  },
})

export const { toggleSideBar } = AppSlice.actions
export const selectApp = (store: any) => store.App as IAppStore
export default AppSlice.reducer
