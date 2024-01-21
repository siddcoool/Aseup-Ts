import axios from 'axios'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createRoutes } from './routes/routes'
import Home from './pages/Home'

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL

const router = createBrowserRouter(createRoutes())


const App = () => {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App