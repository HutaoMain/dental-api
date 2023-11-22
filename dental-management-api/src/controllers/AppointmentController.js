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

const getAppointmentsByDoctorEmail = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.find({
      doctorEmail: req.params.doctorEmail,
    });
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
    const appointments = await AppointmentModel.find({
      email: req.params.email,
    });
    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAppointmentCount = async (req, res) => {
  try {
    const { email, appointmentDate, doctorEmail } = req.query;

    // Count appointments for the specified doctor/clinic on the given date
    const count = await AppointmentModel.countDocuments({
      email: email,
      appointmentDate: appointmentDate,
      doctorEmail: doctorEmail,
    });

    res.status(200).json(count);
  } catch (error) {
    console.error("Error fetching appointment count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAppointmentById = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};

const updateAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAppointment,
  getAppointmentById,
  getAppointmentList,
  getAppointmentByEmail,
  getMonthlyAppointmentCounts,
  getAppointmentCount,
  deleteAppointmentById,
  updateAppointmentById,
  getAppointmentsByDoctorEmail,
};
