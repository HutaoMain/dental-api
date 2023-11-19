const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
    },
    clinicName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
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
    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("appointments", AppointmentSchema);
