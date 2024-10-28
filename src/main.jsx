import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import About from './Pages/About.jsx'
import Layout from './Layout.jsx'
import ProtectedRoutes from './Components/ProtectedRoutes.jsx'

const router=createBrowserRouter([
  {
    path:'',
    element:<Layout />,
    children:[
      {
        path:'',
        element:<ProtectedRoutes component={<Home/>}/>
      },
      {
        path:'login',
        element:<Login />
      },
      {
        path:'register',
        element:<Register />
      },
      {
        path:'about',
        element:<About  />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

)
