// routes/reports.js
const express = require("express");
const router = express.Router();
const { fetchReports } = require("../controllers/reportController");

router.get("/", fetchReports);

module.exports = router;
