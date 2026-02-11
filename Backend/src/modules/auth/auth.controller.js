const { Status, AppConfig } = require("../../config/constant");
// const { randomStringGenerator } = require("../../utils/helpers");
const authSvc = require("./auth.service");
// const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

class AuthController {
  register = async (req, res, next) => {
   try { 
    const payload = await authSvc.transformAuthUser(req)
    const authUser = await authSvc.createUser(payload)
    await authSvc.notifyAfterRegistration(authUser)
    res.json({
      data: {
        _id: authUser._id,
        name: authUser.name,
        email: authUser.email, 
        role: authUser.role, 
        image: authUser.image, 
        address: authUser.address
      },
      message: "Data received",
      status: "MESSAGE_RECEIVED",
      options: null,
    });
   } catch(exception) {
    next(exception)
   }
  };

  verifyActivationToken = async (req, res, next) => {
    try {
      let token = req.query.token;
      // activation 
      // filter => data fetch => find({}), findOne({})
      const user = await authSvc.getSingleUserByFilter({
        activationToken: token
      });

      if(!user) {
        throw {
          code: 422,
          message: 'User not found with associated token',
          status: "USER_NOT_FOUND"
        }
      }
      // activation process
      await authSvc.updateSingleUserByFilter({
        _id: user._id
      }, {
        status: Status.ACTIVE,
        activationToken: null, 
        isEmailVerified: true
      })
      await authSvc.notifyPostActivation(user);
      // res.redirect(AppConfig.frontendUrl+'login')
    } catch(exception) {
      next(exception)
    }
  };

  login =async (req, res, next) => {
    try {
      let {email, password} = req.body;
      // email registered or not
      const user = await authSvc.getSingleUserByFilter({email: email});
      if(!user) {
        // if not user registered
        // throw {
        //   code: 422,
        //   message: "User not found",
        //   status: "USER_NOT_FOUND"
        // }
      }

      // user exists
      if(!user.isEmailVerified || user.status === Status.INACTIVE || user.activationToken) {
        // throw {
        //   code: 422,
        //   message: "User not activated or email not verified",
        //   status: "USER_NOT_VERIFIED"
        // }
      }

      // password verify
      // if(!bcrypt.compareSync(password, user.password)) {
      //   throw {
      //     code: 422,
      //     message: "Credentials does not match",
      //     status: "CREDENTIAL_DOES_NOT_MATCH"
      //   }
      // }

      let token = jwt.sign({
        sub: user._id,
        typ: "Bearer",
      // }, AppConfig.jwtSecret, {
        expiresIn: "15min"
      }) // expiry time, 180minute

      let refreshToken = jwt.sign({
        sub:user._id,
        typ: "Refresh",
      // }, AppConfig.jwtSecret, {
        expiresIn: "1day"
      })

      // TODO: db table store => random return 

      res.json({
        data: {
          access: token,
          refresh: refreshToken
        },
        message: "Login success",
        status: "LOGIN_SUCCESS",
        options: null
      })

    } catch(exception) {
      next(exception)
    }
  };

  // public, private
  getLoggedInUserProfile = (req, res, next) => {
    res.json({
      // data: req.loggedInUser,
      message: "Your profile",
      status: "SUCCESS",
      options: null
    })
  };

  sendForgetPasswordRequest = async (req, res, next) => {
    try {
      let {email}= req.body;
      const userDetail = await authSvc.getSingleUserByFilter({
        email: email
      })
      if(!userDetail) {
        // throw {
        //   code: 422,
        //   message: "User not found",
        //   status: "AUTH_USER_NOT_FOUND"
        // }
      }
      // user found 
      const updated = await authSvc.updateSingleUserByFilter({
        _id: userDetail._id
      }, {
        // forgetPasswordToken: randomStringGenerator(100),
        expiryTokenTime: Date.now() + 3600000
      })

      // notify 
      await authSvc.notifyForgetPasswordRequest(updated)
      res.json({
        data: null,
        message:"A link has been forwarded in your email with password reset option. Please check your email.",
        status: "RESET_LINK_SENT",
        options: null
      })
    } catch (exception) {
      next(exception)
    }
  };

  resetPasswordRequest = async (req, res, next) => {
    try {
      let token = req.params.token
      const {password} = req.body;
      const userDetail = await authSvc.getSingleUserByFilter({
        forgetPasswordToken: token
      })
      if(!userDetail) {
        // throw {
        //   code: 422,
        //   message: "User not found",
        //   status: "AUTH_USER_NOT_FOUND",
        // };
      }

      await authSvc.updateSingleUserByFilter({
        _id: userDetail._id
      }, {
        forgetPasswordToken: null, 
        expiryTokenTime: null, 
        // password: bcrypt.hashSync(password, 10)
      })

      // notify 
      await authSvc.notifyPasswordUpdateSuccess(userDetail)

      res.json({
        data: null, 
        message: "Password updated successfully.",
        status: "AUTH_PASSWORD_RESET_SUCCESS",
        options:null
      })
    } catch(exception) {
      next(exception)
    }
  };

  verifyForgetPasswordToken = async (req, res, next) => {
    try {
      let token = req.params.token
      const userDetail = await authSvc.getSingleUserByFilter({
        forgetPasswordToken: token
      });
      if(!userDetail) {
        // throw {
        //   code: 422,
        //   message: "User not found",
        //   status: "AUTH_USER_NOT_FOUND",
        // };
      }

      // 
      let tokenExpired = userDetail.expiryTokenTime.getTime() // milliseconds
      let today = Date.now()
      if(today > tokenExpired) {
        // throw {
        //   code: 422,
        //   message:"Token Expired. Resubmit the request",
        //   status: "AUTH_FORGET_TOKEN_EXPIRED"
        // }
      } else {
        const updated = await authSvc.updateSingleUserByFilter({
          _id: userDetail._id
        }, {
          // forgetPasswordToken: randomStringGenerator(100),
          expiryTokenTime: Date.now() + 3600000
        })

        // res.redirect(AppConfig.frontendUrl+'reset-password/'+updated.forgetPasswordToken)
      }
    } catch (exception) {
      next(exception)
    }
  };

    logout = async (req, res, next) => {
        try {
            res.clearCookie('access_token', {
                httpOnly: true,
                secure: AppConfig.env === 'production',
                sameSite: 'strict',
                path: '/',
            });

            res.json({
                message: "Logged out successfully",
                status: "LOGOUT_SUCCESSFUL",
            });
        } catch (exception) {
            res.clearCookie('access_token', {
                httpOnly: true,
                secure: AppConfig.env === 'production',
                sameSite: 'strict',
                path: '/',
            });

            res.json({
                message: "Logged out successfully",
                status: "LOGOUT_SUCCESSFUL",
            });
        }
    };


    refreshToken = async (req, res, next) => {
    try {
      let token = req.headers['authorization'] || null;
      if(!token)  {
        // throw {
        //   code: 401,
        //   message: "Unauthorized",
        //   status: "AUTH_REFRESH_TOKEN_EXPECTED"
        // }
      } else {
        token = token.split(" ").pop();
        const payload = jwt.verify(token, AppConfig.jwtSecret);
        if(payload.typ !== 'Refresh') {
          // throw {
          //   code: 403,
          //   message: "Refresh token expected",
          //   status: "AUTH_TOKEN_INVALID"
          // }
        } else {
          const user = await authSvc.getSingleUserByFilter({
            _id: payload.sub
          })
          if(!user) {
            // throw {
            //   code: 401,
            //   message: "Unauthorized",
            //   status: "AUTH_UNKNOWN_USER",
            // };
          } else {
            let token = jwt.sign({
              sub: user._id,
              typ: "Bearer",
            // }, AppConfig.jwtSecret, {
              expiresIn: "15min"
            }) // expiry time, 180minute

            let refreshToken = jwt.sign({
              sub:user._id,
              typ: "Refresh",
            // }, AppConfig.jwtSecret, {
              expiresIn: "1day"
            })

            res.json({
              data: {
                access: token,
                refresh: refreshToken,
              },
              message: "refresh success",
              status: "REFRESH_SUCCESS",
              options: null,
            });
          }
        }

      }
    } catch(exception) {
      next(exception)
    }
  }
}

const authCtrl = new AuthController();
module.exports = authCtrl