const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

const Users = mongoose.model("users", usersSchema);

const findUserByEmail = (email) => Users.findOne({ email });

const createNewUser = (userData) => {
  const newUser = new Users(userData);
  return newUser.save();
};

module.exports = {
  findUserByEmail,
  createNewUser,
};