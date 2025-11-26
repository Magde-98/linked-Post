
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import Notfound from './components/Notfound/Notfound'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import ProtectedAuth from './components/protectedAuth/protectedAuth'
import PostDetails from './components/postDetails/postDetails'

function App() {

  const routes = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: 'login', element: <ProtectedAuth> <Login /> </ProtectedAuth> },
        { path: 'signup', element: <ProtectedAuth> <Register /> </ProtectedAuth> },
        { path: 'profile', element: <ProtectedRoute> <Profile /> </ProtectedRoute> },
        { path: 'PostDetails/:id', element: <ProtectedRoute> <PostDetails /> </ProtectedRoute> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
