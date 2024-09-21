import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GreetingPage from "./pages/GreetingPage";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <GreetingPage /> },
      { path: "main", element: <MainPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
