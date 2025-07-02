import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/router.jsx'
import 'aos/dist/aos.css';
import Aos from 'aos'
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // <-- add this
Aos.init()

const queryClient = new QueryClient(); // <-- add this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urban max-w-7xl mx-auto'>
      <QueryClientProvider client={queryClient}> {/* <-- wrap your app */}
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
