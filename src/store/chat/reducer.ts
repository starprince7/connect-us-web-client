import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage } from '../../types/message'
import apiClient from '../../config/api-client'

interface IChatStore {
  error: string
  requestStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  isChatBoxOpen: boolean
  activeChatConversation: IMessage[]
  page: number
  pages: number
  chatRecipientInformation: {
    fullname: string
    email: string
    onLeave: boolean
    _id: string
  }
}

type FetchConversationParam = { page: number; _id: string }

const name = 'chat'
const initialState: IChatStore = {
  error: '',
  requestStatus: 'idle',
  isChatBoxOpen: false,
  activeChatConversation: [],
  page: 0,
  pages: 0,
  chatRecipientInformation: {
    fullname: '',
    email: '',
    onLeave: false,
    _id: '',
  },
}

// Async redux action chat.
export const fetchConversationStoreAction = createAsyncThunk<any, FetchConversationParam>(
  `${name}/fetchConversationStoreAction`,
  async ({ page, _id }) => {
    const { data } = await apiClient.get(`/chat/${_id}?page=${page}`)
    return data
  },
)

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
      state.activeChatConversation = action.payload.messageConversations
      state.page = action.payload.page
    },
    setChatRecipientInformation: (
      state,
      action: PayloadAction<IChatStore['chatRecipientInformation']>,
    ) => {
      state.chatRecipientInformation = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationStoreAction.pending, (state) => {
      state.requestStatus = 'loading'
    })
    builder.addCase(fetchConversationStoreAction.rejected, (state, action) => {
      state.error = action.error.message as string
      state.requestStatus = 'failed'
    })
    builder.addCase(fetchConversationStoreAction.fulfilled, (state, action) => {
      state.activeChatConversation = action.payload?.data
      state.page = action.payload?.page
      state.pages = action.payload?.pages
      state.requestStatus = 'succeeded'
    })
  },
})

export const { openChat, closeChat, setActiveConversation, setChatRecipientInformation } =
  chatSlice.actions
export default chatSlice.reducer
export const selectChat = (store: any) => store.Chat as IChatStore
