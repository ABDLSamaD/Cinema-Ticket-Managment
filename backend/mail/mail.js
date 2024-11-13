const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// configure mail and send it to verify it's email
const sendMail = async (name, email, userId, random) => {
  try {
    const verificationToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expiration time
    });
    const verificationLink = `${process.env.FRONTEND_BASE_URL}/verify-email/${verificationToken}`;

    // Include the verificationLink in your email
    const emailContent = `${verificationLink}`;

    // 1. create Email Transporter - SMTP(Simple Mail Trasnfer Protocol)
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    // 2. Configure email content.
    const mailOption = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Email",
      html: `<p> ${name} Verify your email address to complete the signup and login into your account. 
      <p>Press <a style="cursor: pointer; color: red; text-decoration:none;" href="${emailContent}"> here </a> to proceed</p> <span>Token exires in 1 day</span> </br> <h2>Random Number then use in our web <span>${random}</span></h2>`,
    };
    const sendmail = await transporter.sendMail(mailOption);
    console.log(sendmail.response);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;
