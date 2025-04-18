const jwt = require("jsonwebtoken");
const users = require("../models/user");
const userAuth = async (req, res, next)=>{
    try {
        const { token } = req.cookies;
        
        if(!token){
            throw new Error("Token is Not Valid !");
        }

        const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
        const { _id } = decodedObj;

        const user = await users.findById(_id);

        if(!user){
            throw new Error("User Not Found");
        }

        req.user = user;
        next();
    } catch (err){
        res.status(400).send("ERROR : "+ err.message);
    }
};

module.exports = { userAuth };


