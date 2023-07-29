import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogDetails from "./components/Pages/BlogPageComp/BlogDetails.jsx";
import HomePage from "./Pages/HomePage";
import BlogPage from "./Pages/BlogPage";
import RidePage from "./Pages/RidePage";
import ConfirmRide from "./Pages/ConfirmRide";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import AuthProvider from "./Providers/AuthProvider";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DriverHome from "./Pages/Dashboard/DashboardPages/DriverPages/DriverHome";
import PrivateRoute from "./routes/PrivateRoute";
import AllUsers from "./Pages/Dashboard/DashboardPages/AdminPages/AllUsers";
import AddCars from "./Pages/Dashboard/DashboardPages/DriverPages/AddCars";
import AdminHome from "./Pages/Dashboard/DashboardPages/AdminPages/AdminHome";
import AllCars from "./Pages/Dashboard/DashboardPages/AdminPages/AllCars";
import PaymentPage from "./Pages/PaymentPage";
import PendingRides from "./Pages/Dashboard/DashboardPages/AllUsers/PendingRides";
import PendingTours from "./Pages/Dashboard/DashboardPages/DriverPages/PendingTours";
import MyRides from "./Pages/Dashboard/DashboardPages/AllUsers/MyRides";
import PaymentHistory from "./Pages/Dashboard/DashboardPages/AllUsers/PaymentHistory";
import UpdateCars from "./Pages/Dashboard/DashboardPages/DriverPages/UpdateCars";
import AllToursDriver from "./Pages/Dashboard/DashboardPages/DriverPages/AllToursDriver";
import Coupon from "./Pages/Dashboard/DashboardPages/AdminPages/Coupon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/ride",
    element: <RidePage />,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetails />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/confirm-ride",
    element: (
      <PrivateRoute>
        <ConfirmRide />
      </PrivateRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <PrivateRoute>
        <PaymentPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/admin/home",
        element: <AdminHome />,
      },
      {
        path: "/dashboard/admin/all-users",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/admin/all-cars",
        element: <AllCars />,
      },
      {
        path: "/dashboard/admin/coupon",
        element: <Coupon />,
      },
      // Driver Routes
      {
        path: "/dashboard/driver/home",
        element: <DriverHome />,
      },
      {
        path: "/dashboard/driver/add-cars",
        element: <AddCars />,
      },
      {
        path: "/dashboard/driver/pending-tours",
        element: <PendingTours />,
      },
      {
        path: "/dashboard/driver/update-cars",
        element: <UpdateCars />,
      },
      {
        path: "/dashboard/driver/all-tours",
        element: <AllToursDriver />,
      },
      // User Route
      {
        path: "/dashboard/pending-rides",
        element: <PendingRides />,
      },
      {
        path: "/dashboard/my-rides",
        element: <MyRides />,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
