import { useState } from 'react'

import { Register } from '../../../api/auth'

export function useLogin() {
  const [viewPassword, setViewPassword] = useState(false)
  return {
    viewPassword,
    setViewPassword,
    Register
  }
}
