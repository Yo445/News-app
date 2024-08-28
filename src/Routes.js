import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Loader from "./components/shared/Loader";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import ArticleDetails from "./pages/ArticleDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "article/:id",
        element: <ArticleDetails />,
      },
      {
        path: "",
        element: <Login />,
      },
      {
        path: "load",
        element: <Loader />,
      },
    ],
  },
]);
