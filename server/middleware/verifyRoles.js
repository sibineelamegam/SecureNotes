// middleware/verifyRoles.js

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.sendStatus(401); // Unauthorized
    if (!allowedRoles.includes(req.role)) return res.sendStatus(403); // Forbidden
    next();
  };
};

export default verifyRoles;
