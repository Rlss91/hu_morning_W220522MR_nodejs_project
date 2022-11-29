const express = require("express");
const router = express.Router();

const {
  validateNewBizSchema,
  validateUpBizSchema,
  validateDeleteBizSchema,
  validateFindBizcardByIdSchema,
} = require("../../validation/biz.validation");
const {
  createNewBizCard,
  showAllBizcards,
  showBizcardById,
  updateBizcardById,
  deleteBizcardById,
} = require("../../models/bizcards.model");

// /api/bizcards
router.get("/", async (req, res) => {
  try {
    const allBizcards = await showAllBizcards();
    res.json(allBizcards);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// /api/bizcards/getbyid/321321315
router.get("/getbyid/:id", async (req, res) => {
  try {
    const validatedValue = await validateFindBizcardByIdSchema(req.params);
    const bizcardData = await showBizcardById(validatedValue.id);
    res.json(bizcardData);
  } catch (error) {
    res.status(400).json({ error });
  }
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
    const userData = await createNewBizCard(
      validatedValue.bizName,
      validatedValue.bizDescription,
      validatedValue.bizAddress,
      validatedValue.bizPhone,
      validatedValue.bizImg
    );
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.put("/", async (req, res) => {
  try {
    const validatedValue = await validateUpBizSchema(req.body);
    const userData = await updateBizcardById(
      validatedValue.id,
      validatedValue.bizName,
      validatedValue.bizDescription,
      validatedValue.bizAddress,
      validatedValue.bizPhone,
      validatedValue.bizImg
    );
    res.json({ msg: "bizcard updated" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const validatedValue = await validateDeleteBizSchema(req.params);
    const bizcardData = await deleteBizcardById(validatedValue.id);
    res.json(bizcardData);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
