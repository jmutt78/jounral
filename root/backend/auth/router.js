"use strict";
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const { User } = require("../users/models");
const { sendMail } = require("../helpers/sendMail");

const config = require("../config");
const router = express.Router();

const { APP_URL } = process.env;

const createAuthToken = function(user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: "HS256"
  });
};

const localAuth = passport.authenticate("local", { session: false });
router.use(bodyParser.json());
router.post("/login", localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({ authToken });
});

const jwtAuth = passport.authenticate("jwt", { session: false });

/*
 * one endpoint to request passowrd reset link 'POST' => email => send email
 * an endpoint to show password reset form 'GET' => token as params
 * an enpoint to hash and update password 'PUT' => token, new password => update password in db
 */

router.get("/confirm_email", async (req, res) => {
  const { token } = req.query;
  try {
    const { user } = jwt.verify(token, config.JWT_SECRET);
    await User.findOneAndUpdate(
      { username: user.username },
      { isConfirmed: true }
    );

    res.send("account confirmed, you can login now");
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
      html: `<p>To confirm your account visit: ${APP_URL}/auth/confirm_email?token=${authToken}</p>` // plain text body
    };
    sendMail(mailOptions, res);
  } else {
    res.status(500).send({
      status: "fail",
      message: "Could not send account confirmation email now, try again!"
    });
  }
});

router.post("/refresh", jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = { router };
