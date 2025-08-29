import jwt from "jsonwebtoken";

export const userAuthMiddlware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized, Login again" });
  }
  try {
    const { id } = jwt.verify(token, process.env.TOKEN_KEY);
    if (id) {
      req.userId = { id };
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
