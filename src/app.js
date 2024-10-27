const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const app = express();
const PORT = 7777;

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res)=>{
    res.send("Data all Sended"); 
});

app.get("/admin/deleteUserData", (req, res)=>{
    res.send("User Data Deleted"); 
});

app.get("/user/getData", userAuth,(req, res)=>{
    res.send("User Data all Sended"); 
});

app.get("/user/change", userAuth, (req, res)=>{
    res.send("User Changed the Data !"); 
});

app.get("/user/login", (req, res)=>{
    res.send("Login Form!...");
});

app.listen(PORT, ()=>{
    console.log(`Server Listening at port - ${PORT}`);
});