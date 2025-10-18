import { useAuth0 } from "@auth0/auth0-react";
import { API_ENDPOINTS } from "../config/endpoints";
export function useAuthFetch() {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
  } = useAuth0();

  const authFetch = async (path, options = {}) => {
    // Wait until Auth0 finishes loading
    if (isLoading) {
      console.log("Auth0 still loading...");
      return;
    }

    // If not authenticated, redirect
    if (!isLoading && !isAuthenticated) {
      await loginWithRedirect();
      return;
    }

    try {
      console.log("trying to fetch...");
      const token = await getAccessTokenSilently({
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      });

      const res = await fetch(path, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      if (!res.ok) {
        const text = await res.text();
        return text;
        //throw new Error(`API request failed: ${res.status} ${text}`);
      }

      return await res.json();
    } catch (err) {
      console.error("authFetch error:", err);
      throw err;
    }
  };

  const gmailCallback = async (code) => {
    const token = await getAccessTokenSilently({
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    });
    
    const res = await fetch(API_ENDPOINTS.GOOGLE_CALLBACK, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    return res;
  };

  return { authFetch, gmailCallback };
}
