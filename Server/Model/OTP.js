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
    console.log("Triggering verification email for:", this.email);
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      console.error("Failed to send verification email in pre-save hook:", error);
      // We still want next() to be called with error if we want the save to fail
      return next(error);
    }
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
