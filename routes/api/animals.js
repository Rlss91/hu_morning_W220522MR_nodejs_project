const express = require("express");
const router = express.Router();

const animalsArr = ["dog", "fish", "mammoth"];
router.get("/", (req, res) => {
  res.json(animalsArr);
});

// router.get("/1", (req, res) => {
//   res.json({ msg: animalsArr[0] });
// });
// router.get("/2", (req, res) => {
//   res.json({ msg: animalsArr[1] });
// });

router.get("/qparams", (req, res) => {
  console.log({ animal: animalsArr[req.query.index] });
});

router.get("/:id", (req, res) => {
  res.json({ animal: animalsArr[req.params.id] });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).json({ msg: "ok" });
});

module.exports = router;
