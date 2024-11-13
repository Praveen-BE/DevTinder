const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const users = require("../models/user");

const requestRouter = express.Router();


requestRouter.get("/sendConnectionRequest", userAuth, async (req, res)=>{
    try{
        const user = req.user;
        res.send(user.firstName+ " Sent a Connection Request !");
    } catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const toUserData = await users.findById(toUserId);

        if(!toUserData){
            return res.status(404).send("User Not Found...");
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                { fromUserId, toUserId},
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        
        if(existingConnectionRequest){
            throw new Error("Existing Connection Request !");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message : req.user.firstName + " " + status + " " + toUserData.firstName,
        });

    } catch (err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

module.exports = requestRouter;