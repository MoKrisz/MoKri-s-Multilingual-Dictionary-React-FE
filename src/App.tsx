import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GreetingPage from "./pages/GreetingPage";
import { QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./pages/RootLayout";
import NewWordPage from "./features/Words/pages/NewWordPage";
import { queryClient } from "./features/Words/api";
import WordPage from "./features/Words/pages/WordPage";
import ManageTranslationGroupPage from "./features/TranslationGroups/pages/ManageTranslationGroupPage";
import TranslationPage from "./features/Translations/pages/TranslationPage";
import WordListPage from "./features/Words/pages/WordListPage";
import TranslationGroupListPage from "./features/TranslationGroups/pages/TranslationGroupListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <GreetingPage /> },
      {
        path: "words",
        children: [
          { index: true, element: <WordListPage /> },
          { path: "new", element: <NewWordPage /> },
          { path: ":wordId", element: <WordPage /> },
        ],
      },
      { path: "translation", element: <TranslationPage /> },
      {
        path: "translation-groups",
        children: [
          { index: true, element: <TranslationGroupListPage /> },
          { path: "new", element: <ManageTranslationGroupPage /> },
          {
            path: ":translationGroupId",
            element: <ManageTranslationGroupPage />,
          },
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
