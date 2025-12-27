// import jwt from 'jsonwebtoken';

// const userAuth = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Not authorized. Please login." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // On attache l'utilisateur à la requête
//     req.user = decoded; // { id, role, isAccountVerified }
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid or expired token." });
//   }
// };

// export default userAuth;


import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Non authentifié" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

    req.user = user; // <-- user complet depuis la DB
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

export default userAuth;
