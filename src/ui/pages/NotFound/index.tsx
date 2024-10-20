import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const naviagte = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      naviagte('/')
    }, 5000)
  }, [])
  return (
    <div>
      <h1>404</h1>
    </div>
  )
}
