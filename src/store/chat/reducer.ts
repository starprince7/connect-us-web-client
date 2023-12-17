import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IChatStore {
  error: string
  payload: any
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  isChatBoxOpen: boolean
  activeChatConversation: {}[]
}

const name = 'chat'
const initialState: IChatStore = {
  error: '',
  payload: null,
  requestStatus: 'idle',
  isChatBoxOpen: false,
  activeChatConversation: [],
}

// Async redux action chat.
export const chatAction = createAsyncThunk(`${name}/chatAction`, async () => {
  const result = (await fetch('')) as any
  return result.data
})

// Create slice.
const chatSlice = createSlice({
  name,
  initialState,
  reducers: {
    openChat: (state) => {
      state.isChatBoxOpen = true
    },
    closeChat: (state) => {
      state.isChatBoxOpen = false
    },
    setActiveConversation: (state, action) => {
      state.activeChatConversation = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chatAction.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(chatAction.rejected, (state, action) => {
      state.error = action.error.message as string
      state.requestStatus = 'failed'
    })
    builder.addCase(chatAction.fulfilled, (state, action) => {
      state.payload = action.payload
      state.requestStatus = 'succeeded'
    })
  },
})

export const { openChat, closeChat, setActiveConversation } = chatSlice.actions
export default chatSlice.reducer
export const selectChat = (store: any) => store.Chat as IChatStore
