const express = require("express");
const router = express.Router();

// /api/bizcards
router.get("/", (req, res) => {
  const bizCardsArr = ["biz1", "biz2", "biz3"];
  res.json({ bizCardsArr, status: "ok" });
});

module.exports = router;
