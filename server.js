const express = require("express");
const student = require("./routes/stdRoute");
const homeRouter = require("./routes/home");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/", homeRouter);
app.use("/student", student);

app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
