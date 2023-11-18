const AppointmentModel = require("../models/AppointmentModel");

const createAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.create(req.body);
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
  }
};

const getAppointmentList = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.find();
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};

const getMonthlyAppointmentCounts = async (req, res) => {
  try {
    const appointmentCounts = await AppointmentModel.aggregate([
      {
        $group: {
          _id: "$appointmentDate",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(appointmentCounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAppointmentByEmail = async (req, res) => {
  try {
    const appointment = await AppointmentModel.find({
      email: req.params.email,
    });
    res.status(200).json(appointment);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createAppointment,
  getAppointmentById,
  getAppointmentList,
  getAppointmentByEmail,
  getMonthlyAppointmentCounts,
};
