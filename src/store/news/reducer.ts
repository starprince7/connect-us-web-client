/***
 * The content of this file is a news to creating more slice/reducer.ts files
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import apiClient from '../../config/api-client'

interface INewsState {
  error: string
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  messages: News[]
}

type News = {
  _id: string
  title: string
  content: string
  user: string
  system: true
  responses: []
  createdAt: string
}
type NewsRequestParams = {
  page: number
  limit?: number
}
type CreateNewsRequestParams = {
  title: string
  content: string
}

const name = 'news'
const initialState: INewsState = {
  error: '',
  requestStatus: 'idle',
  messages: [],
}

// Async redux action news.
export const getNewsAsyncAction = createAsyncThunk<any, NewsRequestParams>(
  `${name}/getNewsAsyncAction`,
  async ({ page, limit }) => {
    const result = await apiClient.get(`/notice?page=${page}&limit=${limit}`)
    return result.data
  },
)

// Async redux action news.
export const createNews = createAsyncThunk<any, CreateNewsRequestParams>(
  `${name}/createNews`,
  async ({ title, content }) => {
    const result = await apiClient.post(`/notice`, { title, content })
    return result.data
  },
)

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
      state.messages = action.payload.data
      state.requestStatus = 'succeeded'
    })
    // Create News Case
    builder.addCase(createNews.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(createNews.rejected, (state, action) => {
      state.error = action.error.message as string
      state.requestStatus = 'failed'
    })
    builder.addCase(createNews.fulfilled, (state, action) => {
      state.messages = action.payload.data
      state.requestStatus = 'succeeded'
    })
  },
})

export const { moreNewsAction } = newsSlice.actions
export const selectNews = (store: any) => store.News as INewsState
export default newsSlice.reducer
