const mongoose = require("mongoose");
require("dotenv").config();
const { defaultProfile, defaultAbout } = require("../constant");
const validator = require("validator");

const mongoDbUri = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true,
        maxLength : 25,
    },
    lastName : {
        type : String,
        maxLength : 25,
    },
    emailId :  {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        set : v => v.replace( /\s\s+/g, '' ),
        maxLength : 100,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email Address : "+value);
            }
        }
    },
    password : {
        type : String,
        require : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is Weak : "+value);
            }
        }
    },
    age : {
        type : Number,
        min : 16,
    },
    photoUrl : {
        type : String,
        default : defaultProfile,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL : "+value);
            }
        }
    },
    about : {
        type : String,
        default : defaultAbout,
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female", "others"].includes(value)){
                throw new Error("Gender data is not Valid !");
            }
        },
    },
    skills : {
        type : [String]
    }
},
{
    timestamps : true,
}
);

const users = mongoose.model("User", userSchema);
// const connection = mongoose.createConnection(mongoDbUri);
// const users = connection.model('users', userSchema);
module.exports =  users;
