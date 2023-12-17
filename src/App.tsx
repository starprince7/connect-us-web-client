import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { RootRouter } from './routes'
import store, { persistor } from './store'
// css
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
        <ToastContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
