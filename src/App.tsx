import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GreetingPage from "./pages/GreetingPage";
import MenuPage from "./pages/MenuPage";
import { QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./pages/RootLayout";
import NewWordPage from "./features/Words/pages/NewWordPage";
import { queryClient } from "./features/Words/api";
import WordPage from "./features/Words/pages/WordPage";
import NewTranslationGroupPage from "./features/TranslationGroups/pages/NewTranslationGroupPage";
import TranslationPage from "./features/Translations/pages/TranslationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <GreetingPage /> },
      {
        path: "words",
        element: <MenuPage />,
        children: [
          { path: "new", element: <NewWordPage /> },
          { path: ":wordId", element: <WordPage /> },
        ],
      },
      { path: "translation", element: <TranslationPage /> },
      {
        path: "translation-groups",
        element: <MenuPage />,
        children: [{ path: "new", element: <NewTranslationGroupPage /> }],
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
