import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/home.tsx';
import Add from './pages/add.tsx';
import Search from './pages/search.tsx';
import Show from './pages/show.tsx';
import { ChakraProvider, Heading, HStack, theme, VStack } from '@chakra-ui/react';
import Header from './components/header.tsx';
import { Footer } from './components/footer.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()


const Wrapper = () => {
  return (
    <>
    <VStack
      minH="100vh"
      gap={0}
    >
      <Header />
      <Outlet />
    </VStack>
    <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "add/:type",
        element: <Add />
      },
      {
        path: "search/:type",
        element: <Search />
      },
      {
        path: "org/:id",
        element: <Show isCompany />
      },
      {
        path: "foundation/:id",
        element: <Show />
      }
    ]
  },
]);




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
)
