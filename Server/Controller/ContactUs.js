const { contactUsEmail } = require("../Mail/Template/ContactForm");
const mailSender = require("../Util/MailSender");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } =
    req.body;
  console.log(req.body);
  try {
    // Email to the user (Confirmation)
    await mailSender(
      email,
      "Your message has been sent successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );

    // Email to the Admin (Site Owner)
    await mailSender(
      "shivamrajbhar883@gmail.com",
      "New Contact Form Submission",
      `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${firstname} ${lastname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${countrycode} ${phoneNo}</p>
      <p><strong>Message:</strong> ${message}</p>
      `
    );

    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
