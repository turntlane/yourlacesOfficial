const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("weeeee", req);

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("hello");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = decoded.UserInfo.username;
    console.log("req.user: ", req.user);
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
