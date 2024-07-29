const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  res.send("Welcome to My Homepage!");
});

module.exports = homeRouter;
