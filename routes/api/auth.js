const express = require("express");
const router = express.Router();

const { validateRegisterSchema } = require("../../validation/auth.validation");
const { findUserByEmail, createNewUser } = require("../../models/users.model");
const { createHash, cmpHash } = require("../../config/bcrypt");

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

router.post("/login", (req, res) => {});

module.exports = router;
