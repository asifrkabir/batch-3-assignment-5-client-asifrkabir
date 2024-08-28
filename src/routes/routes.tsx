import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AboutUs from "../pages/AboutUs";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllBikes from "../pages/Bike/AllBikes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import BikeDetails from "../pages/Bike/BikeDetails";
import MyRentals from "../pages/Bike/MyRentals";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bikes",
        element: (
          <ProtectedRoute>
            <AllBikes />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bikes/:id",
        element: (
          <ProtectedRoute>
            <BikeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-rentals",
        element: (
          <ProtectedRoute>
            <MyRentals />
          </ProtectedRoute>
        ),
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
]);

export default router;
