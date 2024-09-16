const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (token == null) {
    console.error("No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || "secret_key", (err, user) => {
    if (err) {
      console.error("Token verification failed", err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};


module.exports = authenticateToken;
