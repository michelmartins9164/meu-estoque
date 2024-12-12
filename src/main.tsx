import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/index.tsx'
import { baseTheme } from '@chakra-ui/react'
import { Provider } from '@chakra-ui/react/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <Provider theme={baseTheme}>
        <AppRoutes />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </StrictMode>
  </QueryClientProvider>
)
