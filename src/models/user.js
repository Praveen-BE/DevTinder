const mongoose = require("mongoose");
require("dotenv").config();
const { defaultProfile, defaultAbout } = require("../constant");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const mongoDbUri = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true,
        maxLength : 25,
        index : true
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
        enum : {
            values : ["male", "female", "other"],
            message : `{VALUE} is not a valid Gender type`
        },
        // validate(value){
        //     if(!["male","female", "others"].includes(value)){
        //         throw new Error("Gender data is not Valid !");
        //     }
        // },
    },
    skills : {
        type : [String]
    }
},
{
    timestamps : true,
}
);

userSchema.methods.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({ _id : user._id }, "DEV@Tinder$790", { expiresIn : "1d" });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const users = mongoose.model("User", userSchema);
// const connection = mongoose.createConnection(mongoDbUri);
// const users = connection.model('users', userSchema);
module.exports =  users;
