import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/index.tsx'
import { baseTheme } from '@chakra-ui/react'
import { Provider } from '@chakra-ui/react/provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider theme={baseTheme}>
        <AppRoutes />
      </Provider>
  </StrictMode>,
)
