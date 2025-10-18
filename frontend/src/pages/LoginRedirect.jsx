import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

export default function LoginRedirect() {
  const { isAuthenticated } = useAuth0();

  console.log(isAuthenticated)
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return <div>Redirecting...</div>;
}
