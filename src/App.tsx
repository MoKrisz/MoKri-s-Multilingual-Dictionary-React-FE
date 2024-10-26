import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GreetingPage from "./pages/GreetingPage";
import MenuPage from "./pages/MenuPage";
import { QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./pages/RootLayout";
import NewWordPage from "./features/Words/pages/NewWordPage";
import { queryClient } from "./features/Words/api";
import WordPage from "./features/Words/pages/WordPage";

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
          { path: "word/:wordId", element: <WordPage />},
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
