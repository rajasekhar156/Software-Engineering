const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const InfoSchema = new mongoose.MongooseSchema({
    infoId: {
        type: Number,
        required: true,
        unique: true
    },
    personName: String,
    phoneNumber: String,
    emailId: String,
    vehicleNumber: String,
    entryTime: Timestamp,
    exitTime: Timestamp
})

module.exports = mongoose.model("Info",InfoSchema);