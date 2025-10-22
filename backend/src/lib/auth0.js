const { SUBJECT_TOKEN_TYPES } = require( "@auth0/ai");
const { Auth0AI } =require("@auth0/ai-vercel");
 




const auth0AI = new Auth0AI({
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CUSTOM_API_CLIENT_ID,
    clientSecret: process.env.AUTH0_CUSTOM_API_CLIENT_SECRET,
  },
});

const withAccessTokenForConnection = (connection,scopes) =>
  auth0AI.withTokenVault({
    connection,
    scopes,
    accessToken: async (_, config) => {
      return config.configurable?.langgraph_auth_user?.getRawAccessToken();
    },
    subjectTokenType: SUBJECT_TOKEN_TYPES.SUBJECT_TYPE_ACCESS_TOKEN,
  });

module.exports = {
  withAccessTokenForConnection
}