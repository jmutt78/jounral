const nodemailer = require("nodemailer");
// const { promisify } = require("util");

const { ADMIN_EMAIL, ADMIN_PWD } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
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
    if (err) {
      res.status(500).send({
        status: "fail",
        message: "Sorry, confirmation email could not be sent. Try Again!"
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "Account Confirmation request succesful, check you mail!"
      });
    }
  });

  // return sendMailAsync(mailOptions).then(
  //   res => console.log(res, "email sent") || res
  // );
};

module.exports = { sendMail };
