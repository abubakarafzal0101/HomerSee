import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found, authorization denied",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

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
