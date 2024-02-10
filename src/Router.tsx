import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { pastLoader, presentLoader, futureLoader, Layout } from '@/pages';

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
        index: true,
        lazy: async () => {
          const Past = (await import('./pages/Past')).default;
          return {
            element: <Past />,
          };
        },
        loader: pastLoader(queryClient),
      },
      {
        path: 'present',
        lazy: async () => {
          const Present = (await import('./pages/Present')).default;
          return { element: <Present /> };
        },
        loader: presentLoader(queryClient),
      },
      {
        path: 'future',
        lazy: async () => {
          const Future = (await import('./pages/Future')).default;
          return { element: <Future /> };
        },
        loader: futureLoader(queryClient),
      },
    ],
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
