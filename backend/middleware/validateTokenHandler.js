const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validationToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.header.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("token",token)
    if (!token) {
        res.status(401).json({
          message: "Not Authorized OR Token is missing",
        });
      }
    jwt.verify(token, process.env.ACCESS_TOKEN_SCERET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "User is unauthorized",
        });
      }
      req.user = decoded.user;
      next();
    });
   
  }
});

module.exports = validationToken;
