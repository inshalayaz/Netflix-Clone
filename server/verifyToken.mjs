import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Invalid Token");
      } else {
        req.user = user;
      }
    });
  } else {
    return res.status(401).json("Auth Token Required");
  }
  next();
};

export default verifyToken;
