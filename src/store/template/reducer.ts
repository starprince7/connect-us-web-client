/***
 * The content of this file is a template to creating more slice/reducer.ts files
 */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITemplateStore {
  error: string
  payload: any
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const name = 'template'
const initialState: ITemplateStore = {
  error: '',
  payload: null,
  requestStatus: 'idle',
}

// Async redux action template.
export const templateAction = createAsyncThunk(`${name}/templateAction`, async () => {
  const result = (await fetch('')) as any
  return result.data
})

// Create slice.
const templateSlice = createSlice({
  name,
  initialState,
  reducers: {
    moreTemplateAction: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(templateAction.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(templateAction.rejected, (state, action) => {
      state.error = action.error.message as string
      state.requestStatus = 'failed'
    })
    builder.addCase(templateAction.fulfilled, (state, action) => {
      state.payload = action.payload
      state.requestStatus = 'succeeded'
    })
  },
})

export const { moreTemplateAction } = templateSlice.actions
export const select_template = (store: any) => store.Template as ITemplateStore
export default templateSlice.reducer
