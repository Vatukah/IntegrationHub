import { useTheme } from "../contexts/ThemeContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Sun,Moon } from "lucide-react";
import { Link } from "react-router";
export default function DashboardNav(){
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const {theme, toggleTheme} = useTheme();
    const isDark = theme === 'dark';
    return(
        <div className={`w-full flex justify-between items-center px-4 py-2   z-50  border-b  ${
        isDark ? "bg-gray-900 text-gray-100 border-gray-800" : "bg-gray-50 text-gray-800 border-gray-400/30"}`}>
        <Link
          to={'/'}
          className={`text-lg font-bold tracking-tight bg-gradient-to-r ${
            isDark
              ? "from-blue-400 to-cyan-400"
              : "from-blue-600 to-cyan-500"
          } bg-clip-text text-transparent`}
        >
          Integration<span className={`font-extrabold  text-gray-400`}>Hub</span>
        </Link>

        <div className="flex gap-2 items-center">
             {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`ml-2 p-2 rounded-md  transition-all ${
              isDark
                ? " hover:bg-gray-800"
                : " hover:bg-gray-100"
            }`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

        {/* User Avatar */}
          {isAuthenticated && user && (
            <span className="ml-2 flex items-center gap-2">
              <img
                src={user.picture}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-gray-400/30"
              />
             
            </span>
          )}
          </div>
        </div>
    )
}