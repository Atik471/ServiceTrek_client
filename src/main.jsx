import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import LocationProvider from "./contexts/LocationProvider.jsx"
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <LocationProvider><AuthProvider>
        <>
          <ToastContainer></ToastContainer>
          <RouterProvider router={router}></RouterProvider>
        </>
      </AuthProvider></LocationProvider>
      
    </HelmetProvider>
  </StrictMode>
);
