import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GreetingPage from "./pages/GreetingPage";
import MenuPage from "./pages/MenuPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./pages/RootLayout";
import NewWordPage from "./features/Words/pages/NewWordPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <GreetingPage /> },
      {
        path: "menu",
        element: <RootLayout />,
        children: [
          { index: true, element: <MenuPage /> },
          { path: "new-word", element: <NewWordPage /> },
        ],
      },
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
