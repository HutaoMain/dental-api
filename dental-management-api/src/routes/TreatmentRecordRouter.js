const router = require("express").Router();

const TreatmentRecordController = require("../controllers/TreatmentRecordController");

router.post("/create", TreatmentRecordController.createTreatmentRecord);

router.get("/:id", TreatmentRecordController.getTreatmentRecordById);

router.get("/", TreatmentRecordController.getTreatmentRecordList);

router.get("/userId/:userId", TreatmentRecordController.getTreatmentByUserId);

module.exports = router;
