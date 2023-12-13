import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { RootRouter } from './routes'

function App() {
  return (
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  )
}

export default App
