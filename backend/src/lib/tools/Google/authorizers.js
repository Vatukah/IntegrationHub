import { withAccessTokenForConnection } from "../../auth0.js";


export const withGmail = withAccessTokenForConnection("google-oauth2",["https://www.googleapis.com/auth/gmail.readonly"])