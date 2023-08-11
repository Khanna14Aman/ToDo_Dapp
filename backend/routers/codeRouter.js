const express = require("express");
const { viewTask, updateTask, createTask } = require("../controllers/controll");
const router = express.Router();
router.route("/create").post(createTask);
router.route("/viewTask").get(viewTask);
router.route("/update").put(updateTask);
module.exports = router;
