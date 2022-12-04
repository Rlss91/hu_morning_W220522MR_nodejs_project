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
const authMiddleware = require("../../middleware/auth.middleware");

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

router.post("/", authMiddleware, async (req, res) => {
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
      validatedValue.bizImg,
      req.userData.id
    );
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.patch("/", authMiddleware, async (req, res) => {
  try {
    const validatedValue = await validateUpBizSchema(req.body);
    const bizCardData = await showBizcardById(validatedValue.id);
    if (!bizCardData) throw "card not exists";
    if (bizCardData.ownerId === req.userData.id || req.userData.isAdmin) {
      await updateBizcardById(
        validatedValue.id,
        validatedValue.bizName,
        validatedValue.bizDescription,
        validatedValue.bizAddress,
        validatedValue.bizPhone,
        validatedValue.bizImg
      );
    } else {
      throw "operation invalid aka unauthorized";
    }
    res.json({ msg: "bizcard updated" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const validatedValue = await validateDeleteBizSchema(req.params);
    const bizcardData = await deleteBizcardById(validatedValue.id);
    res.json(bizcardData);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
