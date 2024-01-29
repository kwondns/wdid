import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index, { indexLoader } from 'pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 10,
    },
  },
});
const router = createBrowserRouter([{ path: '/', element: <Index />, loader: indexLoader(queryClient) }]);

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
