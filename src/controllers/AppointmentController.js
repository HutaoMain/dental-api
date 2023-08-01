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
    const appointment = await AppointmentModel.findById(req.params._id);
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
};
