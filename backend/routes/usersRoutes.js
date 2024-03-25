const express = require("express");
const users = require("../controllers/usersContoller");
const reportQuery = require("../controllers/reportQueries");

const router = express.Router();

router.get("/usuarios", reportQuery, users.getDataAuthorized);

router.post("/usuarios", reportQuery, users.insertUser);

router.post("/login", reportQuery, users.checkLog);

module.exports = router;
