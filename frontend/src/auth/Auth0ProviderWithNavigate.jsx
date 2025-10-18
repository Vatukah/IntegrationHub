import { Auth0Provider } from "@auth0/auth0-react";

export default function Auth0ProviderWithNavigate({ children }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  // Redirect directly to origin after login
  const onRedirectCallback = () => {
    window.location.href = "/dashboard";
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
    //   authorizationParams={{
    //     redirect_uri: window.location.origin,
    //     audience,
    //   }}
      authorizationParams={{ redirect_uri: `${window.location.origin}/dashboard`, audience:audience }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
