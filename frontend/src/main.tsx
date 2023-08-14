import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import AuthLayout from './components/layout/AuthLayout.tsx';
import Register from './pages/Register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
