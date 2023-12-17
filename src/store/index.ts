import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// reducers
import chatReducer from './chat/reducer'
import authReducer from './auth/reducer'
import newsReducer from './news/reducer'

export const rootReducer = combineReducers({
  Chat: chatReducer,
  Auth: authReducer,
  News: newsReducer,
})
const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['Chat', 'News'],
}
const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({ reducer: persistedReducer })

export const persistor = persistStore(store)
export default store
