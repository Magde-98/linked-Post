import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App.jsx'
import TokenContextProvider from './context/tokenContext.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
        <Toaster position="top-center"/>
        <ReactQueryDevtools initialIsOpen={false} />
      </StrictMode>
    </QueryClientProvider>
  </TokenContextProvider>



)
