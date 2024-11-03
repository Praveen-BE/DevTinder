const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
require("dotenv").config();
const users = require("./models/user");

const app = express();
const PORT = 7777;

app.use(express.json());

app.post("/signup", async (req, res)=>{
    try{
        // console.log(req.body);
        // const userObj = {
        //     firstName : "Praveen",
        //     lastName : "R",
        //     emailId : "praveen@gmail.com",
        //     password : "Praveen&123"
        // }
        const userData = new users(req.body);
        await userData.save();
        res.send("UserData Added Successfully...");
    } catch(err) {
        console.error(err.message);
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

connectDB().then(()=>{
    console.log("Database Connection established...");

    app.listen(PORT, ()=>{
        console.log(`Server Listening at port - ${PORT}`);
    });
}).catch((error)=>{
    console.error("Database cannot be Connected !!!");
});
