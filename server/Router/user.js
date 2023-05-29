const express = require("express");
const router = express.Router();
const { Counter } = require("../Model/Counter.js");
const { User } = require("../Model/User.js");

router.post("/register", (req, res) => {
  console.log(req, res);
});
