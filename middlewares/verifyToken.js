const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) =>{
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({message: "Unauthorized"})
  }
  jwt.verify(token, JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(403).json({ message: "Invalid User Token" });
    }
    
    req.user = decoded.data;
    return next();
  });
}