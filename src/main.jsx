import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import About from './Pages/About.jsx'
import Layout from './Layout.jsx'

const router=createBrowserRouter([
  {
    path:'',
    elementlement:<Layout />,
    children:[
      {
        path:'',
        elementlement:<Home />
      },
      {
        path:'login',
        elementlement:<Login />
      },
      {
        path:'register',
        elementlement:<Register />
      },
      {
        path:'about',
        elementlement:<About  />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

)
