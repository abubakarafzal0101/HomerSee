import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const headers = req.headers;
    if (!headers || !headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const token = headers.authorization.split(" ")[1];

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error, "Error in isAuth Middleware");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default isAuth;
