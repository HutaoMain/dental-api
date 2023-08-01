const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("appointments", AppointmentSchema);
