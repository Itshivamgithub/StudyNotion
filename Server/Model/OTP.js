const mongoose = require("mongoose");
const mailSender = require("../Util/MailSender");
const emailTemplate = require("../Mail/Template/EmailVerification");
const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(email, "Verification Email", emailTemplate(otp));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  console.log("New document saved to database:", this.email);

  // Only send an email when a new document is created
  if (this.isNew) {
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      console.error("Error occurred while sending verification email:", error);
      return next(error);
    }
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
