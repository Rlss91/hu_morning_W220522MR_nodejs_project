const express = require("express");
const router = express.Router();

const {
  validateRegisterSchema,
  validateLoginSchema,
  validateForgotPasswordSchema,
} = require("../../validation/auth.validation");
const {
  findUserByEmail,
  createNewUser,
  updatePasswordById,
} = require("../../models/users.model");
const { createHash, cmpHash } = require("../../config/bcrypt");
const { genToken, verifyToken } = require("../../config/jwt");
const { json } = require("express");

router.post("/register", async (req, res) => {
  try {
    const validatedValue = await validateRegisterSchema(req.body);
    const user = await findUserByEmail(validatedValue.email);
    if (user) {
      throw "try different email";
    }
    const hashedPassword = await createHash(validatedValue.password);
    validatedValue.password = hashedPassword;
    await createNewUser(validatedValue);
    res.status(201).json({ msg: "user created" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const validatedValue = await validateLoginSchema(req.body);
    const user = await findUserByEmail(validatedValue.email);
    if (!user) {
      throw "invalid email/password";
    }
    const isEqual = await cmpHash(validatedValue.password, user.password);
    if (!isEqual) {
      throw "invalid email/password";
    }
    const token = await genToken({
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
    });
    res.json({ token });
  } catch (error) {
    global.logger.warn({
      method: req.method,
      error: error.message,
      url: req.originalUrl,
      body: req.body,
      ip: req.ip,
    });
    res.status(400).json({ error });
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const validatedValue = await validateForgotPasswordSchema(req.body);
    const userData = await findUserByEmail(validatedValue.email);
    if (!userData) throw "check your inbox";
    const jwt = await genToken({ email: userData.email }, "1h");
    //send email or sms
    console.log("http://localhost:3000/resetpassword/" + jwt);
    res.json({ msg: "check your inbox" });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  try {
    //add joy for password
    const payload = await verifyToken(req.params.token);
    const userData = await findUserByEmail(payload.email);
    if (!userData) throw "something went wrong";
    const hashedPassword = await createHash(req.body.password);
    await updatePasswordById(userData._id, hashedPassword);
    res.json({ msg: "password updated" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
