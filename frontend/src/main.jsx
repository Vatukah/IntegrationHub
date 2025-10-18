import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(

    <Auth0ProviderWithNavigate>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </Auth0ProviderWithNavigate>

);
