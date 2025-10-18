import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { isAuthenticated, user } = useAuth0();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedIn(true);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ loggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthContext);
