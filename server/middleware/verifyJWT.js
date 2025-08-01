// middleware/verifyJWT.js
import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden

    // Consistent with your accessToken payload
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

export default verifyJWT;

// We’re not going to use full user data in verifyJWT, we just need the role (and maybe status) to check access — so embedding role in the JWT is faster and enough.
// You avoid a database query on every route access.