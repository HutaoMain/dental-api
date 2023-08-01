const router = require("express").Router();
const AppointmentController = require("../controllers/AppointmentController");

router.post("/create", AppointmentController.createAppointment);

router.get("/:id", AppointmentController.getAppointmentById);

router.get("/", AppointmentController.getAppointmentList);

router.get("/:email", AppointmentController.getAppointmentByEmail);

module.exports = router;
