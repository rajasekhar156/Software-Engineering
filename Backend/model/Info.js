const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    infoId: {
        type: Number,
        required: true,
        unique: true
    },
    personName: String,
    phoneNumber: String,
    emailId: String,
    vehicleNumber: String,
    entryTime: String,
    exitTime: String
})

module.exports = mongoose.model("Info",InfoSchema);