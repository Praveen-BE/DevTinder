const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const users = require("../models/user");
const sendEmail = require("../utils/sendEmail");

const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " Sent a Connection Request !");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const toUserData = await users.findById(toUserId);

      if (!toUserData) {
        return res.status(404).send("User Not Found...");
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Existing Connection Request !");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      // const emailRes = await sendEmail.run(
      //   "A new from request from " + req.user.firstName,
      //   req.user.firstName + " is " + status + " in " + toUserData
      // );

      // console.log(emailRes);

      res.json({
        message: req.user.firstName + " " + status + " " + toUserData.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const DISPLAY_PROFILE =
        "firstName lastName age gender skills photoUrl about";

      if (!loggedInUser) {
        return res.status(400).send("User Should need Loggin...");
      }

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid Status : " + status);
      }

      const connectionRequestData = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", DISPLAY_PROFILE);

      if (!connectionRequestData) {
        return res.status(400).send("User Not Found...");
      }

      connectionRequestData.status = status;

      const data = await connectionRequestData.save();

      res.json({ message: loggedInUser.firstName + " " + status, data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
