import { ChakraProvider } from '@chakra-ui/react'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from '../ui/pages/Register'
import User from '../ui/pages/User'

const Login = lazy(() => import('../ui/pages/Login'))
const NotFound = lazy(() => import('../ui/pages/NotFound'))
const Home = lazy(() => import('../ui/pages/Home'))
export default function AppRoutes() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrar" element={<Register />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ChakraProvider>
  )
}
