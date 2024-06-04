const nodemailer = require("nodemailer");

const transport = () =>
  nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

const signUpEmail = (userEmail, otp) => {
  transport().sendMail({
    from: "emailverification@gupshup.com",
    to: userEmail,
    subject: "Verify your email",
    html: `<h1>${otp}</h1>`,
  });
};

module.exports = signUpEmail;
