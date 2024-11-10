const express = require("express");
const { userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
require("dotenv").config();
const users = require("./models/user");
const { getJWT, validatePassword } = require("./models/user");
const { ALLOWED_UPDATES } = require("./constant");
const { validateSignUpData, validateSignInData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res)=>{
    try{
        // validation
        validateSignUpData(req);

        // Encrypt the Password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // console.log(passwordHash);

        const userData = new users({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        });
        await userData.save();
        res.send("UserData Added Successfully...");
    } catch(err) {
        res.status(400).send("ERROR : "+err.message);
    }
});

app.post("/login", async (req, res)=>{
    try {
        // validate signin data
        validateSignInData(req);

        const { emailId, password } = req.body;
        const user = await users.findOne({ emailId : emailId });
        if(!user){
            throw new Error("Invalid Credintials...");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            // create a jwt token
            const token = await user.getJWT();
            // add the token to cookie and send the response back to the user
            res.cookie("token", token,{ 
                expires: new Date(Date.now() + 7 * 3600000)
            });
            res.send("User Login Succesfully...");
        }
        else {
            throw new Error("Invalid Credintials...");
        }
    } 
    catch (err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

app.get("/profile", userAuth, async (req, res)=>{
    try{
        const user = req.user;
        res.send(user);
    } catch (err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

app.get("/sendConnectionRequest", userAuth, async (req, res)=>{
    try{
        const user = req.user;
        res.send(user.firstName+ " Sent a Connection Request !");
    } catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});



connectDB().then(()=>{
    console.log("Database Connection established...");

    app.listen(PORT, ()=>{
        console.log(`Server Listening at port - ${PORT}`);
    });
}).catch((error)=>{
    console.error("Database cannot be Connected !!!");
});
