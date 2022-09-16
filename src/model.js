const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userAddress: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("MyUser", UserSchema);
module.exports = UserModel;
