const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

function initializeDatabase() {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      console.log("Error connecting Database:", error);
    });
}

module.exports = { initializeDatabase };
