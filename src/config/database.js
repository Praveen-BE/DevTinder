const mongoose = require("mongoose");
require("dotenv").config();

// const mongoDbUri = process.env.MONGODB_URI;
const mongoDbUri =
  "mongodb+srv://Praveen:oh3yPa80obQzo2e3@cluster0.0y8vu.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(mongoDbUri);
};

module.exports = connectDB;
