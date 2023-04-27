import {
  createBrowserRouter, Navigate,
} from "react-router-dom";
import AboutData from "../components/AboutData";
import BaseStat from "../components/BaseStat";
import Evolution from "../components/Evolution";
import MovesData from "../components/MovesData";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/details/:id",
    element: <DetailPage />,
    children: [
      {
        index: true,
        element: <Navigate to="about" replace />
      },
      {
        path: "about",
        element: <AboutData />
      },
      {
        path: "base-stat",
        element: <BaseStat />
      },
      {
        path: "evolution",
        element: <Evolution />
      },
      {
        path: "moves",
        element: <MovesData />
      },

    ]
  }
]);

export default router