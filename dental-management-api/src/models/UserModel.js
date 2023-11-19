const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    clinicName: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    fullname: {
      type: String,
    },
    birthdate: {
      type: String,
    },
    assistantName: {
      type: String,
    },
    graduateSchool: {
      type: String,
    },
    address: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
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
