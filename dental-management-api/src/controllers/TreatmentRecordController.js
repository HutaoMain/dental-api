const TreatmentRecordModel = require("../models/TreatmentRecordModel");

const createTreatmentRecord = async (req, res) => {
  try {
    const treatmentRecord = await TreatmentRecordModel.create(req.body);
    res.status(200).json(treatmentRecord);
  } catch (err) {
    console.log(err);
  }
};

const getTreatmentRecordById = async (req, res) => {
  try {
    const treatmentRecord = await TreatmentRecordModel.findById(req.params.id);
    res.status(200).json(treatmentRecord);
  } catch (err) {
    console.log(err);
  }
};

const getTreatmentRecordList = async (req, res, next) => {
  try {
    const appointment = await TreatmentRecordModel.find();
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};

const getTreatmentByUserId = async (req, res, next) => {
  try {
    const appointment = await TreatmentRecordModel.find({
      userId: req.params.userId,
    });
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTreatmentRecord,
  getTreatmentRecordById,
  getTreatmentRecordList,
  getTreatmentByUserId,
};
