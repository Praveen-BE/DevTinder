const express = require("express");

const app = express();
const PORT = 7777;

// app.use("/",(req, res)=>{
//     res.send("Hello from the Server!");
// });

app.use("/test",(req, res)=>{
    res.send("Test from the Server!");
});
app.use("/hello",(req, res)=>{
    res.send("hello from the Server!");
});

app.listen(PORT, ()=>{
    console.log(`Server Listening at port -${PORT}`);
});