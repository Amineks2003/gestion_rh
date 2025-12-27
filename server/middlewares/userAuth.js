import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    // FIX 1: Check both Cookies AND Headers for the token
    let token = req.cookies.token;

    // If not in cookies, check Authorization header (Bearer token)
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Please login." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // FIX 2: Set 'req.userId' because your controller expects it!
    if (decoded.id) {
        req.userId = decoded.id;
    } else if (decoded._id) {
        req.userId = decoded._id;
    } else {
        // Fallback if your token structure is different (e.g. just the ID string)
        req.userId = decoded; 
    }
    
    // Also keep this just in case other parts use it
    req.user = decoded; 

    next();

  } catch (error) {
    console.log("Auth Error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default userAuth;