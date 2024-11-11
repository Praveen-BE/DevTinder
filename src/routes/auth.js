const express = require("express");
const bcrypt = require("bcrypt");
const { getJWT, validatePassword } = require("../models/user");
const { validateSignUpData, validateSignInData } = require("../utils/validation");
const authRouter = express.Router();
const users = require("../models/user");

authRouter.post("/signup", async (req, res)=>{
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

authRouter.post("/login", async (req, res)=>{
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

authRouter.post("/logout", async (req, res)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now())
    });

    res.send("Logout Successfully...");
});

module.exports = authRouter;