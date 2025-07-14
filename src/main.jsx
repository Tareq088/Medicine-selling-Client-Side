import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,} from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// Create a client
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className='max-w-11/12 mx-auto'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RouterProvider router={router} />
            <ToastContainer/>
        </AuthProvider>
      </QueryClientProvider>
        
      </div>
  </StrictMode>,
)
