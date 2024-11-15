const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const users = require("../models/user");
const userRouter = express.Router();

const DISPLAY_PROFILE = "firstName lastName age gender skills photoUrl about";

userRouter.get("/user/request/received", userAuth, async(req, res)=>{
    try {
        const loggedInUser = req.user;

        const connectionRequestReceived = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested",
        }).populate("fromUserId", DISPLAY_PROFILE);

        res.json({ message : "Data Fetched Successfully", data : connectionRequestReceived})
    } catch (err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

userRouter.get("/user/connection", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;

        const connectedData = await ConnectionRequest.find({
            $or : [
                { fromUserId: loggedInUser._id, status : "accepted" },
                { toUserId: loggedInUser._id, status : "accepted" },
            ]
        }).populate("fromUserId", DISPLAY_PROFILE)
        .populate("toUserId", DISPLAY_PROFILE);

        const data = connectedData.map(row=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
               return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ message : data });
    } catch (err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

userRouter.get("/feed", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;

        const interactedUser = await ConnectionRequest.find({
            $or : [{fromUserId : loggedInUser._id}, { toUserId : loggedInUser._id}],
        }).select("fromUserId toUserId");

        const avoidUserInFeed = new Set();

        interactedUser.forEach((user)=>{
            avoidUserInFeed.add(user.fromUserId._id.toString());
            avoidUserInFeed.add(user.toUserId._id.toString());
        });

        // console.log(avoidUserInFeed);
        const showUsersInFeed = await users.find({ 
            $and : [
                { _id : { $nin : Array.from(avoidUserInFeed) } },
                { _id : { $ne : loggedInUser._id } }
            ]
        }).select(DISPLAY_PROFILE);

        res.json({
            data : showUsersInFeed
        });
    } catch(err){
        res.status(400).json({ message : err.message });
    }
});

module.exports = userRouter ;