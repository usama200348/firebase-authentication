import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout.jsx'
import Home from './pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import About from './Pages/About.jsx'
import ProtectedRoutes from './Components/ProtectedRoutes.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <ProtectedRoutes component={<Home />}/>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'about/*',
        element:  <ProtectedRoutes component={<About />}/>,
        children: [
          {
            path: '', 
            element: <h1>/ route</h1>
          },
          {
            path: 'nested1',
            element: <h1>Nested one</h1>
          },
          {
            path: 'nested2',
            element: <h1>Nested two</h1>
          },
          {
            path: 'nested3',
            element: <h1>Nested three</h1>
          },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)


