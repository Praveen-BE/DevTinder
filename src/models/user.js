const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbUri = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    emailId :  String,
    password : String,
    age : Number,
    gender : String,
});

const users = mongoose.model("User", userSchema);
// const connection = mongoose.createConnection(mongoDbUri);
// const users = connection.model('users', userSchema);
module.exports =  users;
