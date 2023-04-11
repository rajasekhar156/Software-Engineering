const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    personName: String,
    personNumber: String,
    userPwd: String
})

module.exports = mongoose.model("User",UserSchema);