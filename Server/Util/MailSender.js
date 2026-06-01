const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    console.log("--- Mail Configuration Check ---");
    console.log("MAIL_HOST present:", !!process.env.MAIL_HOST);
    console.log("MAIL_USER present:", !!process.env.MAIL_USER);
    console.log("MAIL_PASS present:", !!process.env.MAIL_PASS);
    console.log("-------------------------------");

    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.error("CRITICAL: Mail configuration is missing from environment variables.");
      throw new Error("Mail configuration missing. Please check Render Environment Variables.");
    }

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    console.log(`Attempting to send email to: ${email}`);
    
    let info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.error("Error occurred while sending mail in mailSender.js:", error.message);
    throw error;
  }
};

module.exports = mailSender;
