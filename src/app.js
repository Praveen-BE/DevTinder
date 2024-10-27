const express = require("express");

const app = express();
const PORT = 7777;

app.get("/user", (req, res)=>{
    res.send({firstName:"Akshay", lastName:"Saini"});
});

app.post("/user", (req, res)=>{
    res.send("Data Succussfully send to Database");
});

app.put("/user", (req, res)=>{
    res.send("Data Succussfully Fully Replaced");
});

app.patch("/user", (req, res)=>{
    res.send("Data Succussfully Partially Updated");
});

app.delete("/user", (req, res)=>{
    res.send("Data Deleted Sucessfully");
});

app.use("/test",(req, res)=>{
    res.send("Test from the Server!");
});

app.listen(PORT, ()=>{
    console.log(`Server Listening at port -${PORT}`);
});