const express = require("express");
const router = express.Router();

const {
  validateNewBizSchema,
  validateUpBizSchema,
  validateDeleteBizSchema,
} = require("../../validation/biz.validation");

// /api/bizcards
router.get("/", (req, res) => {
  const bizCardsArr = ["biz1", "biz2", "biz3"];
  res.json({ bizCardsArr, status: "ok" });
});

// /api/bizcards/getbyid/321321315
router.get("/getbyid/:id", (req, res) => {
  console.log("params", req.params);
});

router.post("/", async (req, res) => {
  /*
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImg
  */
  try {
    const validatedValue = await validateNewBizSchema(req.body);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.put("/", async (req, res) => {
  try {
    const validatedValue = await validateUpBizSchema(req.body);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const validatedValue = await validateDeleteBizSchema(req.params);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
