const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
require("dotenv").config();
const users = require("./models/user");
const { ALLOWED_UPDATES } = require("./constant");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 7777;

app.use(express.json());

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

app.get("/user", async (req, res)=>{
        const userEmail = req.body.emailId;
        try {
            const usersData = await users.findOne({ emailId : userEmail });
            if(usersData.length === 0){
                res.status(404).send("User Not Found !");
            } else {
                res.send(usersData);
            }
        } catch (err){
            res.status(400).send("Something Went Wrong...");
        }
});

app.get("/byId", async (req, res)=>{
    const userId = req.body._id;
    try {
        const userData = await users.findById(userId);
        if(userData == null){
            res.status(404).send("User Not Found !");
        } else {
            res.send(userData);
        }
    } catch (err){
        res.send("Something Wrong...");
    }
});

app.get("/feed", async (req, res)=>{
    try {
        const usersData = await users.find({});
        res.send(usersData); 
    } catch (err){
        res.status(400).send("Something Went Wrong...");
    }
});

app.delete("/user", async(req, res)=>{
    try {
        const userId = req.body.userId;
        const user = await users.findByIdAndDelete(userId);
        res.send("User Deleted Successfully...");
    } catch (err){
        res.status(400).send("Something Went Wrong...");
    }
});

app.patch("/user/:userId", async(req, res)=>{
    try{
            const userId = req.params.userId;
            // const userEmailId = req.body.emailId;
            const data = req.body;
            // console.log(data);

            const isUpdateAllowed = Object.keys(data).every(
                k => ALLOWED_UPDATES.includes(k)
            );

            if(!isUpdateAllowed){
                throw new Error("Update not Allowed !");
            }

            if(data?.skills.length>10){
                throw new Error("Skills Can not be more than Ten...");
            }

        const userData = await users.findByIdAndUpdate(
            userId, data,
            { returnDocument: "after", runValidators: true }
        );
        // const userData = await users.findOneAndUpdate(
        //  {emailId : userEmailId}, data,{returnDocument: "after", runValidators: true} );
        console.log(userData);
        res.send("User Updated Successfully...");
    } catch (err){
        res.status(400).send("Something Went Wrong..."+err.message);
    }
});

app.put("/user", async(req, res)=>{
    try{
        // const userId = req.body.userId;
        const userEmailId = req.body.emailId;
        const data = req.body;
        // console.log(data);
        // const userData = await users.findByIdAndUpdate(userId, data, {returnDocument: "after"});
        const userData = await users.findOneAndReplace({emailId : userEmailId}, data, {returnDocument: "after"});
        console.log(userData);
        res.send("User Replaced Successfully...");
    } catch (err){
        res.status(400).send("Something Went Wrong...");
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
