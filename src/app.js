const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const app = express();
const PORT = 7777;

app.use("/", (err, req, res, next)=>{
    if(err){
        res.status(500).send("Something Went Wrong!");
    }
});


app.use("/user", (req, res)=>{
    // Logic of DB call and get User Data

    // Proper Way Handling Error Try Catch Block
    // try {
        throw new Error("akdhfasj");
        res.send("User Data Send!");
    // } catch(err){
        res.status(500).send("Some Error Contact Support Tema");
    // }

});

// Wildcard Error handling
app.use("/", (err, req, res, next)=>{
    if(err){
        // also log the error or notify the error for Server
        console.log("WildCard Error Handler Hited !...")
        res.status(500).send("Something Went Wrong!");
    }
});

app.listen(PORT, ()=>{
    console.log(`Server Listening at port - ${PORT}`);
});