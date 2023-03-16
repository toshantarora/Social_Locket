// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "./styles/globalStyles.css";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Outlet,
  // Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./layout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Search from "./pages/search/Search";
import Support from "./pages/support/Support";
import Connect from "./pages/connect/Connect";
import Setting from "./pages/setting/Setting";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/support",
          element: <Support />,
        },
        {
          path: "/connect",
          element: <Connect />,
        },
        {
          path: "/setting",
          element: <Setting />,
        },
        // {
        //   path: "/profile/:id",
        //   element: <Profile />,
        // },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
