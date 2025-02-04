const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbUri = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose.connect(mongoDbUri);
};

module.exports = connectDB;
