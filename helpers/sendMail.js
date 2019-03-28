const nodemailer = require("nodemailer");
// const { promisify } = require("util");

const { ADMIN_EMAIL, ADMIN_PWD } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: ADMIN_EMAIL, // generated ethereal user
    pass: ADMIN_PWD // generated ethereal password
  }
});

const sendMail = async ({ to, subject, html }, res) => {
  const mailOptions = {
    from: ADMIN_EMAIL,
    to,
    subject,
    html
  };

  //const sendMailAsync = promisify(transporter.sendMail);
  transporter.sendMail(mailOptions, err => {
    console.log(err);
    if (err) {
      res.status(500).send({
        status: "fail",
        message: "Sorry, confirmation email could not be sent. Try Again!"
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Account Confirmation request successful, check you mail!"
      });
    }
  });

  // return sendMailAsync(mailOptions).then(
  //   res => console.log(res, "email sent") || res
  // );
};

module.exports = { sendMail };
