"use strict";
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { User } = require("../users/models");
const { sendMail } = require("../helpers/sendMail");
const config = require("../config");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { APP_URL, RESET_URL } = process.env;

const createAuthToken = function(user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: "HS256"
  });
};

const createResetToken = function(user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: "10m",
    algorithm: "HS256"
  });
};

const localAuth = passport.authenticate("local", { session: false });
router.use(bodyParser.json());
router.post("/login", localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  const { user } = jwt.verify(authToken, config.JWT_SECRET);
  if (user.isConfirmed === true) {
    res.json({ authToken });
  } else {
    res.status(403).send({
      code: 403,
      status: "fail",
      message: "Please comfirm your email"
    });
  }
});

const jwtAuth = passport.authenticate("jwt", { session: false });

router.post("/reset", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const authToken = createResetToken(user.serialize());
    const mailOptions = {
      to: username, // list of receivers
      subject: "Password Reset Confirmation", // Subject line
      html: `<p>To reset your account visit click <a href="${RESET_URL}/reset?token=${authToken}">here</a></p>
             `
    };
    sendMail(mailOptions, res);
  } else {
    res.status(500).send({
      status: "fail",
      message: "Could not send account confirmation email now, try again!"
    });
  }
});

router.get("/reset", async (req, res) => {
  const { token } = req.query;
  try {
    const { user } = jwt.verify(token, config.JWT_SECRET);
    await User.findOneAndUpdate({ username: user.username });

    res.send("account confirmed, you can login now");
  } catch (err) {
    res.send("account confirmation not successfull");
  }
});

router.get("/confirm_email", async (req, res) => {
  const { token } = req.query;
  try {
    const { user } = jwt.verify(token, config.JWT_SECRET);
    await User.findOneAndUpdate(
      { username: user.username },
      { isConfirmed: true }
    );

    res.send(
      `<script>
  var timeout = 1000;
  setTimeout(function () {
     window.location = "https://my-journal-app123.herokuapp.com/confirm";
  }, timeout);
</script>`
    );
  } catch (err) {
    res.send("account confirmation not successfull");
  }
});

router.post("/confirm_email", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const authToken = createAuthToken(user.serialize());
    const mailOptions = {
      to: username, // list of receivers
      subject: "Account Confirmation", // Subject line
      html: `<p>To confirm your account please click <a href="${APP_URL}/auth/confirm_email?token=${authToken}">here</a> </p>` // plain text body
    };
    sendMail(mailOptions, res);
  } else {
    res.status(500).send({
      status: "fail",
      message: "Could not send email"
    });
    console.log("usernotfound");
  }
});

router.post("/refresh", jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = { router };
