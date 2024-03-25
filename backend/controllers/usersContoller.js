const UserDb = require("../models/usersModels");
require("dotenv").config({ path: "./server.env" });
const jwt = require("jsonwebtoken");
const errorHandler = require("./errors");

class usersController {
  constructor() {}

  async insertUser(req, res) {
    try {
      await UserDb.insertData(req.body);
      res.status(200).json({
        message: "Usuario insertado correctamente",
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async checkLog(req, res) {
    try {
      const { email } = req.body;
      await UserDb.checkData(req.body);
      const token = jwt.sign({ email }, process.env.SIGNATURE);
      res.status(200).json({ token });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async getDataAuthorized(req, res) {
    try {
      const token = req.header("Authorization").split("Bearer ")[1];
      jwt.verify(token, process.env.SIGNATURE);
      const { email } = jwt.decode(token);
      const user = await UserDb.getData(email);
      res.status(200).json(user);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}
module.exports = new usersController();
