const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();


requestRouter.get("/sendConnectionRequest", userAuth, async (req, res)=>{
    try{
        const user = req.user;
        res.send(user.firstName+ " Sent a Connection Request !");
    } catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

module.exports = requestRouter;
