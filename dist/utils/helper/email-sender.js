"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHelper = void 0;
const nodemailer = require("nodemailer");
class EmailHelper {
    static async sendOtpEmail(email, otp) {
        try {
            let transporter = nodemailer.createTransport({
                host: 'mail.gologonow.app',
                port: 465,
                secure: true,
                auth: {
                    user: 'testing@gologonow.app',
                    pass: '87kkzX6F66w1',
                },
            });
            const mailOptions = {
                from: 'testing@gologonow.app',
                to: email,
                subject: 'OTP Verification',
                html: `<p>Your OTP is  ${otp} </p>`,
            };
            await transporter.sendMail(mailOptions);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.EmailHelper = EmailHelper;
//# sourceMappingURL=email-sender.js.map