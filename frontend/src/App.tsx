import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { createRoutes } from './routes/routes'

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL

const router = createBrowserRouter(createRoutes())


const App = () => {
  return (<>
    <RouterProvider router={router}>
    </RouterProvider>
    <ToastContainer/>
    </>
  )
}

export default App