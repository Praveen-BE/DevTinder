const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const users = require("../models/user");
const { parse } = require("dotenv");
const userRouter = express.Router();

const DISPLAY_PROFILE = "firstName lastName age gender skills photoUrl about";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequestReceived = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", DISPLAY_PROFILE);

    res.json({
      message: "Data Fetched Successfully",
      data: connectionRequestReceived,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const userId = loggedInUser._id.toString();
    // console.log(userId);
    // console.log(loggedInUser);
    const connectedData = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", DISPLAY_PROFILE)
      .populate("toUserId", DISPLAY_PROFILE);
    // console.log("Whole Array is " + connectedData);
    let messageData = [];
    const data = connectedData.map((row) => {
      const fromUserIdString = row.fromUserId._id.toString();
      const toUserIdString = row.toUserId._id.toString();
      // console.log("From User ID " + fromUserIdString);
      // console.log("To User ID " + toUserIdString);
      if (fromUserIdString == userId) {
        messageData.push(row.toUserId);
      }
      if (toUserIdString == userId) {
        messageData.push(row.fromUserId);
      }
    });

    res.json({ message: messageData });
  } catch (err) {
    // console.log("Error" + err);
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit < 50 ? limit : 50;
    const skipLimit = (page - 1) * limit;

    const interactedUser = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const avoidUserInFeed = new Set();

    interactedUser.forEach((user) => {
      avoidUserInFeed.add(user.fromUserId._id.toString());
      avoidUserInFeed.add(user.toUserId._id.toString());
    });

    const showUsersInFeed = await users
      .find({
        $and: [
          { _id: { $nin: Array.from(avoidUserInFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      })
      .select(DISPLAY_PROFILE)
      .skip(skipLimit)
      .limit(limit);

    res.json({
      data: showUsersInFeed,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
