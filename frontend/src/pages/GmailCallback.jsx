import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthFetch } from "../hooks/useAuthFetch.js";
import { useLocation } from "react-router";

export default function GmailCallback() {
  const { isAuthenticated, isLoading, loginWithPopup,getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { gmailCallback } = useAuthFetch();
  const [data, setData] = useState(null);

  useEffect(() => {
    // only run after Auth0 is fully loaded AND user is authenticated
  // console.log(getAccessTokenSilently())
    const code = queryParams.get("code");
     console.log("Now safe to fetch Gmail URL", code);

   const res = gmailCallback(code);
   console.log(res)
    setData(res);
  }, []); // reruns when Auth0 state updates


  return (
    <div>
      {isLoading && <p>Loading Auth0...</p>}
      {!isLoading && !isAuthenticated && <p>Redirecting to login...</p>}
      {(
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
