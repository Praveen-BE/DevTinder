const express = require("express");

const app = express();
const PORT = 7777;

// app.use("/route", [rH1, rH2, rH3, rH4, rH5]);

app.use("/user", [ (req, res, next)=>{
    console.log("Handling the Route User 1 !!");
    // res.send("1 Responsible!!");
    next();
}, (req, res, next)=>{
    console.log("Handling the Route User 2 !!");
    // res.send("2 Responsible!!");
    next();
}, (req, res, next)=>{
    console.log("Handling the Route User 3 !!");
    // res.send("3 Responsible!!");
    next();
}],
(req, res, next)=>{
    console.log("Handling the Route User 4!!");
    // res.send("4 Responsible!!");
    next();
},
(req, res, next)=>{
    console.log("Handling the Route User 5 !!");
    res.send("5 Responsible!!");
    // next();
} 
);

app.listen(PORT, ()=>{
    console.log(`Server Listening at port - ${PORT}`);
});