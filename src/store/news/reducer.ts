/***
 * The content of this file is a news to creating more slice/reducer.ts files
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface INewsState {
  error: string
  payload: any
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  messages: {}[]
}

const name = 'news'
const initialState: INewsState = {
  error: '',
  payload: null,
  requestStatus: 'idle',
  messages: [],
}

// Async redux action news.
export const getNewsAsyncAction = createAsyncThunk(`${name}/newsAction`, async () => {
  const result = (await axios.get('')) as any
  return result.data
})

// Create slice.
const newsSlice = createSlice({
  name,
  initialState,
  reducers: {
    moreNewsAction: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getNewsAsyncAction.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(getNewsAsyncAction.rejected, (state, action) => {
      state.error = action.error.message as string
      state.requestStatus = 'failed'
    })
    builder.addCase(getNewsAsyncAction.fulfilled, (state, action) => {
      state.payload = action.payload
      state.requestStatus = 'succeeded'
    })
  },
})

export const { moreNewsAction } = newsSlice.actions
export const selectNews = (store: any) => store.news as INewsState
export default newsSlice.reducer
