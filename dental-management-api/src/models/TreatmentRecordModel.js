const mongoose = require("mongoose");

const TreatmentRecordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    toothNumber: {
      type: Number,
    },
    procedure: {
      type: String,
    },
    dentist: {
      type: String,
      required: true,
    },
    amountCharge: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    nextAppointment: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("treatment-record", TreatmentRecordSchema);
