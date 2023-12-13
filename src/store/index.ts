import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = {
  State: '' as any, // Reducer
}

const store = configureStore({ reducer: rootReducer })
export default store
