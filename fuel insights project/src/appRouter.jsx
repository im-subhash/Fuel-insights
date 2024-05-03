import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LayoutPage from "./pages/LayoutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Contact from "./pages/ContactPage.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import TripAnalysisPage from "./pages/TripAnalysisPage.jsx";
import LiveTracking from "./pages/LiveTracking.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        errorElement: <ErrorPage />,
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/contactus",
        element: <Contact />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/tripAnalysis",
        element: <TripAnalysisPage />,
      },
      {
        path : "/liveTracking",
        element : <LiveTracking/>
      },
      {
        path : "/dashboard",
        element : <Dashboard/>
      }
    ],
  },
]);

export default appRouter;
