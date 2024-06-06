const nodemailer = require("nodemailer");

const verifcationEmailTemplate = (code, owner) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
      />
      <title>Gup Shup Email verification</title>
    </head>
    <body>
      <div class="container mt-5 p-5 bg-dark text-white">
        <h1 class="text-center text-success pb-3">Gup Shup</h1>
        <div>
          <p class="text-center">Your email verification code:</p>
          <h1 class="text-center pb-3">${code}</h1>
          <a href="http://localhost:5173/verify-email?${owner}" class="btn btn-success d-block mx-auto">Verify Now</a
          >
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"
      ></script>
    </body>
  </html>`;
};

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
    html: verifcationEmailTemplate(otp),
  });
};

module.exports = signUpEmail;
