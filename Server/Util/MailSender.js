const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.warn("Mail configuration is missing from environment variables.");
    }
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      secure: false,
    });
    let info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return info;
  } catch (error) {
    console.error("Error in mailSender:", error.message);
    throw error;
  }
};

module.exports = mailSender;
