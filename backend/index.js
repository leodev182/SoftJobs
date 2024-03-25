const cors = require("cors");
const express = require("express");
const app = express();
const usersRoutes = require("./routes/usersRoutes.js");
const errorHandler = require("./controllers/errors.js");
const reportQuery = require("./controllers/reportQueries.js");

app.use(express.json());
app.use(cors());
app.use("/", usersRoutes);
app.use(errorHandler);
app.use(reportQuery);

app.listen(3000, () => {
  console.log("Server On!");
});
