import { useState } from 'react'

import { Register } from '../../../api/firebase/auth'

export function useLogin() {
    const [viewPassword, setViewPassword] = useState(false)
     return {
        viewPassword,
        setViewPassword,
        Register
    }
}