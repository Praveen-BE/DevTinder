const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();

const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(()=>{
    console.log("Database Connection established...");

    app.listen(PORT, ()=>{
        console.log(`Server Listening at port - ${PORT}`);
    });
}).catch((error)=>{
    console.error("Database cannot be Connected !!!");
});
