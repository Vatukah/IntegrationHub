import { Link } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import GmailConnect from "../pages/gmailConnect.jsx";
import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext.jsx";

export default function Navbar() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 border-b transition-colors duration-300 ${
        isDark
          ? "bg-gray-950/80 border-gray-800 text-gray-100"
          : "bg-white/70 border-gray-200 text-gray-900 backdrop-blur-md"
      } backdrop-blur-lg`}
    >
      <div className=" px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold tracking-tight bg-gradient-to-r ${
            isDark ? "from-blue-400 to-cyan-400" : "from-blue-600 to-cyan-500"
          } bg-clip-text text-transparent`}
        >
          Integration
          <span className="font-extrabold text-blue-600 dark:text-white">
            Hub
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={` p-2 rounded-md  transition-all ${
              isDark ? " hover:bg-gray-800" : " hover:bg-gray-100"
            }`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`transition-colors hover:text-blue-500 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <button
              onClick={() => loginWithRedirect()}
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-medium hover:scale-105 transition-transform shadow-md"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? (
            <X
              className={`w-6 h-6 transition-colors ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 transition-colors ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col items-center border-t transition-all duration-300 ${
            isDark
              ? "bg-gray-900 border-gray-800 text-gray-200"
              : "bg-white border-gray-200 text-gray-800"
          } py-4 space-y-3`}
        >
          <Link to="/" className="hover:text-blue-500 transition-colors">
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-500 transition-colors"
              >
                Dashboard
              </Link>
              <GmailConnect />
              <Link
                to="/gmail/send"
                className="hover:text-blue-500 transition-colors"
              >
                Send Email
              </Link>
            </>
          )}

          {!isAuthenticated ? (
            <button
              onClick={() => loginWithRedirect()}
              className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-medium"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
