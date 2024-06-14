import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'
import { Home } from './Home.tsx'
import './index.css'
import ErrorPage from './pages/error-page.tsx'
import About from './pages/About.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    ),

    errorElement: <ErrorPage />,
    children: [
      {
        path: '/products',
        element: '<Products />',
      },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
