const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    contactNumber: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      default: "patient",
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
