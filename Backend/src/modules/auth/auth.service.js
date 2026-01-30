const fileUploadSvc = require("../../services/file-upload.service")
const {Status, AppConfig} = require("../../config/constants")
const bcrypt = require("bcryptjs");
const { randomStringGenerator } = require("../../utils/helpers");
const UserModel = require("../users/user.model");
const emailSvc = require("../../services/email.service");
class AuthService {
  // Repository Pattern
  transformAuthUser = async (req) => {
    try {
      // logic
      let payload = req.body;
      payload.image = await fileUploadSvc.fileupload(req.file.path, "users/");
      payload.status = Status.INACTIVE;
      payload.isEmailVerified = false;

      // password encrypt
      payload.password = bcrypt.hashSync(payload.password, 10);

      // custom function
      payload.activationToken = randomStringGenerator();

      return payload;
    } catch (exception) {
      throw exception;
    }
  };

  createUser = async (data) => {
    try {
      const user = new UserModel(data);
      return await user.save(); // insert
    } catch (exception) {
      throw exception;
    }
  };

  getSingleUserByFilter = async (filter) => {
    try {
      const user = await UserModel.findOne(filter);
      return user;
    } catch (exception) {
      throw exception;
    }
  };

  updateSingleUserByFilter = async (filter, data) => {
    try {
      const user = await UserModel.findOneAndUpdate(
        filter,
        { $set: data },
        {
          new: true,
        }
      ); //   before update data return , new => true, : after update data
      return user;
    } catch (exception) {
      throw exception;
    }
  };

  notifyAfterRegistration = async (payload) => {
    try {
      return await emailSvc.sendEmail({
        to: payload.email,
        subject: "Activate Your Account!!!",
        message: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #333;">Welcome to Our Service!</h2>
              <p>Hi ${payload.name},</p>
              <p>Thank you for registering with us. Please click the link below to activate your account:</p>
              <a href="${AppConfig.appUrl}auth/activate?token=${payload.activationToken}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Activate Account</a>
              <p>If you did not create an account, please ignore this email.</p>
              <p>Best regards,</p>
              <p>No-Reply</p>
            </div>
            `,
      });
    } catch (exception) {
      throw exception;
    }
  };

  notifyPostActivation = async (user) => {
    try {
      return await emailSvc.sendEmail({
        to: user.email,
        subject: "Welcome to Our Ecommerce Platform!",
        message: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden;">
            <tr>
              <td style="background-color: #007bff; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">Welcome to Our Ecommerce Platform!</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
            <p>Hi ${user.name},</p>
            <p>We are thrilled to have you on board. Your account has been successfully activated, and you can now start exploring our wide range of products.</p>
            <p>Here are some things you can do next:</p>
            <ul style="padding-left: 20px;">
              <li>Browse our <a href="${
                AppConfig.frontendUrl
              }/products" style="color: #007bff;">latest products</a> and find what you love.</li>
              <li>Check out our <a href="${
                AppConfig.frontendUrl
              }/offers" style="color: #007bff;">exclusive offers</a> and save big on your purchases.</li>
              <li>Visit your <a href="${
                AppConfig.frontendUrl
              }/account" style="color: #007bff;">account dashboard</a> to manage your profile and orders.</li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to our <a href="${
              AppConfig.frontendUrl
            }/support" style="color: #007bff;">support team</a>.</p>
            <p>Happy shopping!</p>
            <p>Best regards,</p>
            <p>The Ecommerce Team</p>
            <p style="font-size: 0.9em; color: #777;">This is an automated message, please do not reply.</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4; padding: 10px; text-align: center;">
            <p style="font-size: 0.8em; color: #777;">&copy; ${new Date().getFullYear()} Our Ecommerce Platform. All rights reserved.</p>
              </td>
            </tr>
          </table>
            </td>
          </tr>
        </table>
          </div>
        `,
      });
    } catch (exception) {
      throw exception;
    }
  };

  notifyForgetPasswordRequest = async (user) => {
    try {
      return await emailSvc.sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        message: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
              <div style="background-color: #007bff; padding: 20px; text-align: center;">
                <h2 style="color: #ffffff; margin: 0;">Password Reset Request</h2>
              </div>
              <div style="padding: 20px;">
                <p>Hi ${user.name},</p>
                <p>We received a request to reset your password. If you made this request, please click the link below to reset your password:</p>
                <a href="${AppConfig.appUrl}auth/verify-forget-token/${
          user.forgetPasswordToken
        }" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>This link is valid for one hour. If you did not request a password reset, please ignore this email.</p>
                <p>For your security, no changes will be made to your account unless you access the link above and reset your password.</p>
                <p>Best regards,</p>
                <p>The Support Team</p>
                <p style="font-size: 0.9em; color: #777;">This is an automated message, please do not reply.</p>
              </div>
              <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
                <p style="font-size: 0.8em; color: #777;">&copy; ${new Date().getFullYear()} Our Ecommerce Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (exception) {
      throw exception;
    }
  };

  notifyPasswordUpdateSuccess = async(user) => {
    try {
      return await emailSvc.sendEmail({
        to: user.email,
        subject: "Password Successfully Reset",
        message: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
            <h2 style="color: #007bff;">Password Reset Successful</h2>
            <p>Hi ${user.name},</p>
            <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>
            <p>If you did not perform this action, please contact our <a href="${AppConfig.frontendUrl}/support" style="color: #007bff;">support team</a> immediately.</p>
            <p>Best regards,</p>
            <p>The Support Team</p>
            <p style="font-size: 0.9em; color: #777;">This is an automated message, please do not reply.</p>
          </div>
        `,
      });
    } catch(exception) {
      throw exception
    }
  }
}

const authSvc = new AuthService()
module.exports = authSvc