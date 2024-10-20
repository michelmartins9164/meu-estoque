import  { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Login = lazy(() => import('../ui/pages/Login'))
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

