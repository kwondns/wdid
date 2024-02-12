import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

import Layout from './pages/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/past" replace /> },
      {
        path: 'past',
        async lazy() {
          const { Past, pastLoader } = await import('./pages/Past');
          return {
            Component: () => (
              <Suspense>
                <Past />
              </Suspense>
            ),
            loader: pastLoader(queryClient),
          };
        },
      },
      {
        path: 'present',
        async lazy() {
          const { Present, presentLoader } = await import('./pages/Present');
          return {
            Component: () => (
              <Suspense>
                <Present />
              </Suspense>
            ),
            loader: presentLoader(queryClient),
          };
        },
      },
      {
        path: 'future',
        async lazy() {
          const { Future, futureLoader } = await import('./pages/Future');
          return {
            Component: () => (
              <Suspense>
                <Future />
              </Suspense>
            ),
            loader: futureLoader(queryClient),
          };
        },
      },
    ],
  },
  {
    path: 'auth',
    async lazy() {
      const { Auth } = await import('./pages/Auth');
      return {
        Component: () => (
          <Suspense>
            <Auth />
          </Suspense>
        ),
      };
    },
  },
]);

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
