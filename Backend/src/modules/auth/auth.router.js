const authRouter = require("express").Router();
const loginCheck = require("../../middleware/auth.middleware");
const uploader = require("../../middleware/file-upload.middleware")
const authCtrl = require("./auth.controller");
const {registerDataDTO, loginDTO, forgetPasswordDTO, resetPasswordDTO}= require("./auth.validator");
const { bodyValidator } = require("../../middleware/request-validator.middleware");


authRouter.post("/register",uploader().single('image'), bodyValidator(registerDataDTO), authCtrl.register);
authRouter.get("/activate", authCtrl.verifyActivationToken);
authRouter.post("/login", bodyValidator(loginDTO), authCtrl.login);    // email, password
authRouter.get('/me', loginCheck(), authCtrl.getLoggedInUserProfile)
authRouter.get('/refresh', authCtrl.refreshToken)
authRouter.post('/forget-password', bodyValidator(forgetPasswordDTO),  authCtrl.sendForgetPasswordRequest)
authRouter.get("/verify-forget-token/:token", authCtrl.verifyForgetPasswordToken) //
authRouter.put("/reset-password/:token",bodyValidator(resetPasswordDTO), authCtrl.resetPasswordRequest);     // password, confirmPassword


module.exports = authRouter