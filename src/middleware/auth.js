
const adminAuth = (req, res, next)=>{
    const authKey = "xyzABc";
    const isAuthorized = authKey === "xyz";
    if(!isAuthorized){
        res.send("You Need to Autorized!");
    } else {
        next();
    }
};

const userAuth = (req, res, next)=>{
    const authKey = "xyz";
    const isAuthorized = authKey === "xyz";
    if(!isAuthorized){
        res.send("You Need to Autorized!");
    } else {
        next();
    }
};

module.exports = { adminAuth, userAuth };


