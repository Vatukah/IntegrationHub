import jwksRsa from "jwks-rsa";
import jwt from "jsonwebtoken";

// JWKS client
const client = jwksRsa({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true,
});

// Function to get signing key
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err, null);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// Middleware
export function verifyAuth0Token(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "missing token" });

    const token = auth.split(" ")[1];
    const verifyOptions = {
      audience: process.env.AUTH0_AUDIENCE, // must match frontend audience
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ["RS256"],
    };

    jwt.verify(token, getKey, verifyOptions, (err, decoded) => {
      if (err) {
        console.error("JWT verify error:", err.message);
        return res.status(401).json({ error: "invalid token", details: err.message });
      }

      // Attach payload to req.user
      req.user = decoded;
      next();
    });
  } catch (e) {
    console.error("Token verification failed:", e);
    return res.status(500).json({ error: "token_verification_failed" });
  }
}
