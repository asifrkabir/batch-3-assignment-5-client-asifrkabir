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
import ManageUsers from "../pages/admin/ManageUsers";
import ManageBikes from "../pages/admin/Bike/ManageBikes";
import ManageRentals from "../pages/admin/ManageRentals";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import ErrorPage from "../pages/ErrorPage";
import ManageCoupons from "../pages/admin/ManageCoupons";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-users",
        element: (
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-bikes",
        element: (
          <ProtectedRoute role="admin">
            <ManageBikes />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-rentals",
        element: (
          <ProtectedRoute role="admin">
            <ManageRentals />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-coupons",
        element: (
          <ProtectedRoute role="admin">
            <ManageCoupons />
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
