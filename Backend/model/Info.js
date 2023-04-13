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

const Infodb = mongoose.model("info", InfoSchema);

async function checkInfo(vehicleNo){
    const query = {vehicleNumber : vehicleNo};
    const result = await Infodb.findOne(query);
    if(result!== null){
        return true;
    }
    else{
        return false;
    }
}

module.exports = mongoose.model("Info",InfoSchema);