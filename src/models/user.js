const mongoose = require("mongoose");
require("dotenv").config();
const { defaultProfile, defaultAbout } = require("../constant");
// const  = require("../constant");

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
    },
    password : {
        type : String,
        require : true,
        minLength : 8,
        maxLength : 20,
        validate: { 
            validator: function (v) {
                // Regex to check for at least one capital letter, one symbol, and one number 
                return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(v); 
            }, 
        message: props => `${props.value} does not meet password criteria!`
    }},
    age : {
        type : Number,
        min : 16,
    },
    photoUrl : {
        type : String,
        default : defaultProfile,
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
