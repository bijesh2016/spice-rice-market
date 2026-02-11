const authRouter = require("express").Router();
const loginCheck = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/file-upload.middleware")
const authCtrl = require("./auth.controller");
const {registerDataDTO, loginDTO, forgetPasswordDTO, resetPasswordDTO} = require("./auth.validator");
// const {bodyValidator} = require("../../middlewares/validator.middleware");

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 * @param   {File} image - User profile image
 * @returns {Object} Success message with user data
 */
authRouter.post("/register", authCtrl.register);

/**
 * @route   GET /api/auth/activate
 * @desc    Verify user email activation token
 * @access  Public
 * @param   {String} token - Activation token (query parameter)
 * @returns {Object} Activation status
 */
authRouter.get("/activate", authCtrl.verifyActivationToken);

/**
 * @route   POST /api/auth/login
 * @desc    User login with email and password
 * @access  Public
 * @returns {Object} JWT token and user data
 */
authRouter.post("/login",  authCtrl.login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user profile
 * @access  Private
 * @returns {Object} User profile data
 */
authRouter.get('/me',  authCtrl.getLoggedInUserProfile);

/**
 * @route   GET /api/auth/refresh
 * @desc    Refresh JWT token
 * @access  Private
 * @returns {Object} New JWT token
 */
authRouter.get('/refresh', authCtrl.refreshToken);

/**
 * @route   POST /api/auth/forget-password
 * @desc    Request password reset token via email
 * @access  Public
 * @returns {Object} Success message with email confirmation
 */
authRouter.post('/forget-password',  authCtrl.sendForgetPasswordRequest);

/**
 * @route   GET /api/auth/verify-forget-token/:token
 * @desc    Verify password reset token validity
 * @access  Public
 * @returns {Object} Token validation status
 */
authRouter.get("/verify-forget-token/:token", authCtrl.verifyForgetPasswordToken);

/**
 * @route   PUT /api/auth/reset-password/:token
 * @desc    Reset user password using token
 * @access  Public
 * @returns {Object} Success message
 */
authRouter.put("/reset-password/:token",  authCtrl.resetPasswordRequest);

/**
 * @route   POST /api/auth/logout
 * @desc    User logout from System
 * @access  Public
 * @returns {Object} Success Message for Logout
 */
authRouter.post("/logout",authCtrl.logout)

module.exports = authRouter;