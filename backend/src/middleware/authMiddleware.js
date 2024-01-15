const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log('Token not provided');
    return res.status(401).json({ status: false, message: 'Unauthorized: Token not provided' });
  }

  const tokenWithoutBearer = token.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid Token:', error.message);
    return res.status(401).json({ status: false, message: 'Unauthorized: Invalid token' });
  }
};


const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ status: false, message: 'Permission denied: Admin access required' });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin };