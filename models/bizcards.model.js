const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bizcardsSchema = new Schema({
  bizName: { type: String, required: true },
  bizDescription: { type: String },
  bizAddress: { type: String, required: true },
  bizPhone: { type: String, required: true },
  bizImg: { type: String },
  //we need to add owner id
});

/*
    mongoose.model:
    1) create collection
    2) connect collection to schema
*/
const Bizcards = mongoose.model("bizcards", bizcardsSchema);

const createNewBizCard = (
  bizName,
  bizDescription,
  bizAddress,
  bizPhone,
  bizImg
) => {
  const bizcard = new Bizcards({
    bizName,
    bizDescription,
    bizAddress,
    bizPhone,
    bizImg,
  });
  return bizcard.save();
};

module.exports = {
  createNewBizCard,
};
