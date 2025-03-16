const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cors = require("cors");

const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

const app = express();
const PORT = 7777;
const allowedOrigin = "http://13.232.150.48";
const corsOption = {
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOption));
app.options("*", cors(corsOption));

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database Connection established...");

    app.listen(PORT, () => {
      console.log(`Server Listening at port - ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database cannot be Connected !!!");
  });
