const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const mailHost = (process.env.MAIL_HOST || "smtp.gmail.com").trim();
    const mailUser = (process.env.MAIL_USER || "").trim();
    const mailPass = (process.env.MAIL_PASS || "").trim();

    console.log("--- Mail Configuration Check ---");
    console.log("MAIL_HOST:", mailHost);
    console.log("MAIL_USER present:", !!mailUser);
    console.log("MAIL_PASS present:", !!mailPass);
    console.log("-------------------------------");

    if (!mailUser || !mailPass) {
      console.error("CRITICAL: Mail credentials missing.");
      throw new Error("Mail configuration missing. Check environment variables.");
    }

    let transporterConfig;

    if (mailHost === "smtp.gmail.com") {
      transporterConfig = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use SSL/TLS
        auth: {
          user: mailUser,
          pass: mailPass,
        },
      };
    } else {
      transporterConfig = {
        host: mailHost,
        port: 587,
        secure: false,
        auth: {
          user: mailUser,
          pass: mailPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      };
    }

    let transporter = nodemailer.createTransport(transporterConfig);

    console.log(`Attempting to send email to: ${email} using ${mailHost === "smtp.gmail.com" ? "Gmail Service" : mailHost}`);

    let info = await transporter.sendMail({
      from: `"StudyNotion" <${mailUser}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Email sent successfully. Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error occurred while sending mail in mailSender.js:", error.message);
    throw error;
  }
};

module.exports = mailSender;
