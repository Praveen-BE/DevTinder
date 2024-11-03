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

connectDB().then(()=>{
    console.log("Database Connection established...");

    app.listen(PORT, ()=>{
        console.log(`Server Listening at port - ${PORT}`);
    });
}).catch((error)=>{
    console.error("Database cannot be Connected !!!");
});
