const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = new mongoose.MongooseSchema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    personName: String,
    personNumber: String,
    emailId: String
})

module.exports = mongoose.model("User",UserSchema);