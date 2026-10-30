import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RootLayout from './layouts/RootLayout';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('./pages/HomePage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { 
        index: true, 
        element: (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
            <HomePage />
          </Suspense>
        ) 
      },
      { 
        path: 'privacy', 
        element: (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
            <PrivacyPage />
          </Suspense>
        ) 
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}