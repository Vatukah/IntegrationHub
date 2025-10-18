import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";

export default function Home() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-6 text-center px-4">
      <h1 className="text-4xl font-bold">Welcome to AI Gmail Agent</h1>
      <p className="text-gray-700 max-w-xl">
        Connect your Gmail account, send emails securely, and let our AI compliance
        assistant ensure your emails follow policy rules.
      </p>

      {!isAuthenticated ? (
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Get Started
        </Link>
      ) : (
        <Link
          to="/dashboard"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Go to Dashboard
        </Link>
      )}
    </div>
  );
}
