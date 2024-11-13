const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// 1- verify if Login and sending a message
const contactMail = async (names, email) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  // mail set user details
  const mailOption = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Feedback of user",
    html: `<p style="color: #000;">${names} Your querry has been submitted </p> </br> ${new Date().toLocaleString()}`,
  };

  const sendMail = await transporter.sendMail(mailOption);
  console.log("user form has been submitted");
};

module.exports = contactMail;
