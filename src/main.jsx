import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,} from "react-router";
import { router } from './Router/Router.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div className='max-w-11/12 mx-auto'>
        <AuthProvider>
            <RouterProvider router={router} />
          <ToastContainer/>
        </AuthProvider>
      </div>
  </StrictMode>,
)
