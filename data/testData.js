const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const BOOKING_DATA = {
  firstname: "Alfarau",
  lastname: "AlA",
  price: 6661,
  username_val: process.env.USERNAME,
  password_val: process.env.PASSWORD,
};

module.exports = { BOOKING_DATA };
