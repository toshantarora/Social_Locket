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
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Notification from "./pages/notification/Notification";
import Profile from "./pages/profile/Profile";
import Privacy from "./pages/privacy/Privacy";
import Inventory from "./pages/inventory/Inventory";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import CreatePassword from "./pages/createPassword/CreatePassword";
import CreatePost from "./pages/createPost/CreatePost";
import PostDetails from "./pages/postDetails/PostDetails";

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
        {
          path: "/notifications",
          element: <Notification />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/privacy",
          element: <Privacy />,
        },
        {
          path: "/inventory",
          element: <Inventory />,
        },
        {
          path: "/create-post",
          element: <CreatePost />,
        },
        {
          path: "/postDetails/:id",
          element: <PostDetails />,
        },
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
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/create-password",
      element: <CreatePassword />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
