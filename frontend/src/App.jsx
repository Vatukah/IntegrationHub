import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";

import { Navigate } from "react-router";

import Dashboard from "./pages/Dashboard.jsx";
import GmailConnect from "./pages/gmailConnect.jsx";
import GmailSend from "./pages/gmailSend.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import GmailCallback from "./pages/GmailCallback.jsx";
import LoginRedirect from "./pages/LoginRedirect.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import './App.css'
import IntegrationSetup from "./pages/IntegrationPage/integrationSetup.jsx";
import DashboardLayout from "./components/layout/Dashboard.Layout.jsx";
import { Component } from "lucide-react";
import Overview from "./components/Overview.jsx";

function ProtectedRoute({ element }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) {
    loginWithRedirect();
    return <div>Redirecting...</div>;
  }

  return element;
}



const router = createBrowserRouter([
  { path: "/", element: <><Navbar /><LandingPage /></> },
  { path: "/login", element: <LoginRedirect /> }, // redirect after login
  { path: "/dashboard", element: <><Navbar /><ProtectedRoute element={<Dashboard />} /></> },
  { path: "/gmail/connect", element: <><Navbar /><ProtectedRoute element={<GmailConnect />} /></> },
  { path: "/gmail/send", element: <><Navbar /><ProtectedRoute element={<GmailSend />} /></> },
  { path: "/gmail/callback", element:<GmailCallback />  },
  { path:'/integration', element: <><Navbar/><IntegrationSetup/></>},
 {
  path: '/dashboard',
  element: <ProtectedRoute element={<DashboardLayout />} />,
  children: [
    {
      index: true,
      element: <Navigate to="overview" replace />,
    },
    {
      path: 'overview',
      element: <Overview />,
    },
    {
      path: 'integration',
      element: <IntegrationSetup />,
    },
    {
      path: '*',
      element: (
        <div className="flex justify-center items-center flex-col h-full">
          <h1 className="text-3xl font-bold">404</h1>
          <p className="text-gray-500">Sorry, this page does not exist.</p>
        </div>
      ),
    },
  ],
}


]);

export default function App() {
  return <RouterProvider router={router} />;
}
