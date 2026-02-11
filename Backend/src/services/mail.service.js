const nodemailer = require("nodemailer");
const { SMTPConfig } = require("../config/config");

class EmailService {
    #transport;
    constructor() {
        try {
            this.#transport = nodemailer.createTransport({
                host: SMTPConfig.host,
                port: SMTPConfig.port,
                service: SMTPConfig.provider,
                auth: {
                    user: SMTPConfig.user,
                    pass: SMTPConfig.password
                }
            });
            console.log("*****SMTP server configured successfully");
        } catch (exception) {
            console.error("*****ERROR configuring SMTP server", exception);
            throw {
                code: 500,
                message: "SMTP server configuration error",
                status: "SMTP_CONFIGURATION_ERR"
            };
        }
    }

    // Test connection method (optional but recommended)
    async verifyConnection() {
        try {
            await this.#transport.verify();
            console.log("*****SMTP server connected successfully");
            return true;
        } catch (error) {
            console.error("*****ERROR connecting to SMTP server", error);
            throw {
                code: 500,
                message: "SMTP server connection error",
                status: "SMTP_CONNECTION_ERR"
            };
        }
    }

    sendEmail = async ({ to, sub, message, attachments = null, cc = null, bcc = null }) => {
        try {
            let emailBody = {
                to: to,
                from: SMTPConfig.from,
                subject: sub,
                html: message,
            };

            // Use square brackets for dynamic property assignment
            if (cc) {
                emailBody['cc'] = cc;
            }
            if (bcc) {
                emailBody['bcc'] = bcc;
            }
            if (attachments) {
                emailBody['attachments'] = attachments;
            }

            const info = await this.#transport.sendMail(emailBody);
            console.log("Email sent:", info.messageId);
            return info;
        } catch (exception) {
            console.error("*****ERROR sending email:", exception);
            throw {
                code: 500,
                message: "Failed to send email",
                status: "EMAIL_SEND_ERR",
                originalError: exception.message
            };
        }
    }
}

module.exports = EmailService;