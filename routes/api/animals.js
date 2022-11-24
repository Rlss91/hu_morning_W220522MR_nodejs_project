const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const animalsArr = ["dog", "fish", "mammoth"];
  res.json(animalsArr);
});

module.exports = router;
