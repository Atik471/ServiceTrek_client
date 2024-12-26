import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import MyServices from "../components/MyServices";
import AddService from "../components/AddService";
import Services from "../components/Services";
import ServiceDetails from "../components/ServiceDetails";
import MyReviews from "../components/MyReviews";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "home",
        element: <Home></Home>,
      },
      {
        path: "add-service",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: "service-details/:id",
        element: <ServiceDetails></ServiceDetails>,
      },
      {
        path: "services",
        element: <Services></Services>,
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "my-services",
        element: (
          <PrivateRoute>
            <MyServices></MyServices>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
