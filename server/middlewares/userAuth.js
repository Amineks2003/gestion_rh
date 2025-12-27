import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // On attache l'utilisateur à la requête
    req.user = decoded; // { id, role, isAccountVerified }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default userAuth;
