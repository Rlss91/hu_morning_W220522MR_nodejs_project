const express = require("express");
const router = express.Router();
const bizCardsRouter = require("./api/bizCards");
const animalsRouter = require("./api/animals");

// http://localhost:3030/api/newuser
router.get("/newuser", (req, res) => {
  res.json({ msg: "ok" });
});

router.use("/bizcards", bizCardsRouter);
router.use("/animals", animalsRouter);

module.exports = router;
