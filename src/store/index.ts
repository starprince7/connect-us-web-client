import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chat/reducer'

export const rootReducer = {
  State: '' as any, // Reducer
  Chat: chatReducer,
}

const store = configureStore({ reducer: rootReducer })
export default store
