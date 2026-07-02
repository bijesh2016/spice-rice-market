const jwt = require("jsonwebtoken");
const { AppConfig, UserRoles } = require("../config/constant");
const UserModel = require("../modules/user/user.model");

const loginCheck = (allowedRoles = []) => async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({
        data: null,
        message: "Authentication token is required",
        status: "UNAUTHORIZED",
        options: null,
      });
    }

    const payload = jwt.verify(token, AppConfig.jwtSecret);
    const user = await UserModel.findById(payload.sub);

    if (!user) {
      return res.status(401).json({
        data: null,
        message: "User not found",
        status: "UNAUTHORIZED",
        options: null,
      });
    }

    req.loggedInUser = user;

    const roles = Array.isArray(allowedRoles) && allowedRoles.length
      ? allowedRoles
      : Object.values(UserRoles);

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        data: null,
        message: "You do not have permission to access this resource",
        status: "FORBIDDEN",
        options: null,
      });
    }

    next();
  } catch (exception) {
    next({
      code: 401,
      message: "Invalid or expired authentication token",
      status: "UNAUTHORIZED",
    });
  }
};

module.exports = loginCheck;
