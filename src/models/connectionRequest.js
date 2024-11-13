const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : `{VALUE} is incorrect Status type`
        }
    }
},
{
    timestamps : true
}
);

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    // check if the fromUserId is same a toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Connot send Connection Request to Yourself...");
    }
    next();
});

connectionRequestSchema.index({ fromUserId : 1, toUserId : 1 });

const ConnectionRequest = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequest;