const router = require("express").Router();

const AppointmentController = require("../controllers/AppointmentController");

router.post("/create", AppointmentController.createAppointment);

router.get("/:id", AppointmentController.getAppointmentById);

router.get("/", AppointmentController.getAppointmentList);

router.get("/list/:email", AppointmentController.getAppointmentByEmail);

router.get("/monthly/data", AppointmentController.getMonthlyAppointmentCounts);

router.get(
  "/getByEmailAndAppointmentDate/count",
  AppointmentController.getAppointmentCount
);

router.get(
  "/getByDoctorEmail/doctorEmail/:doctorEmail",
  AppointmentController.getAppointmentsByDoctorEmail
);

router.put("/update/:id", AppointmentController.updateAppointmentById);

router.delete("/delete/:id", AppointmentController.deleteAppointmentById);

module.exports = router;
