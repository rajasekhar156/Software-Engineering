const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema({
    vehicleNumber: {type:String,required: true},
    personName: String,
    phoneNumber: String,
    emailId: String,
    entryDate: String,
    entryTime: String,
    exitTime: String,
    ExpectedDate: String,
    ExpectedentryTime: String,
    ExpectedexitTime: String
},
{
    versionKey:false
});

const Infodb = mongoose.model("info", InfoSchema);


async function Addentry1(regNo,pername,phNo,email,entryDt,entryT){

    const query = { vehicleNumber : regNo,personName: pername,phoneNumber: phNo,emailId: email,entryDate: entryDt,entryTime: entryT };
    // const result = await Infodb.findOne(query);
    console.log(query);
    try{
        await Infodb.insertMany(query);
    }
    catch(err){
        console.log("failed to insert the document");
    }
};

async function Addentry2(regNo,name,phNo,email,expDate,expentryT,expexitT){
    const query = {vehicleNumber : regNo,personName: name,phoneNumber: phNo,emailId: email,ExpectedDate: expDate,ExpectedentryTime: expentryT,ExpectedentryTime: expexitT};
    // const result = await Infodb.findOne(query);
    Infodb.insertOne(query);
    return true;
}

module.exports = {Addentry1,Addentry2};