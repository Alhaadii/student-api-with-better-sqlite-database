const express = require("express");
const student = require("./routes/stdRoute");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/student", student);

app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
