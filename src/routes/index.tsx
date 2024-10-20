import { ChakraProvider } from '@chakra-ui/react'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ChakraProvider>
  )
}
