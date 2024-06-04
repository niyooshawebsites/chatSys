const nodemailer = require("nodemailer");

<<<<<<< HEAD
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
=======
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
// send email function
const signUpEmail = (otp) => {
  transport.sendMail();
>>>>>>> d9c944d01a8108c5def99fe6c936e1ef64170ee5
};

module.exports = signUpEmail;
