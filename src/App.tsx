import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GreetingPage from "./pages/GreetingPage";
import MainPage from "./pages/MainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <GreetingPage /> },
      { path: "main", element: <MainPage /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
