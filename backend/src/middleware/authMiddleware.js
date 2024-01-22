const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

adminAuth = (req, res, next) => {
  console.log('Admin Auth Middleware Called');
  console.log('Received Token:', req.headers.authorization);
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  console.log('Received Token:', token);
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token not available" });
  }


  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    console.log('Decoded Token:', decodedToken);
    if (err || !decodedToken) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      if (decodedToken.role !== "admin") {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        next();
      }
    }
  });
}

userAuth = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token not available" });
  }

  jwt.verify(token, jwtSecret, (err, decodedToken) => {
    console.log('Decoded Token in userAuth:', decodedToken);
    if (err || !decodedToken) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      console.log('Decoded Token:', decodedToken);
      if (decodedToken.role !== "Basic") {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        next();
      }
    }
  });
}


module.exports = { userAuth, adminAuth };