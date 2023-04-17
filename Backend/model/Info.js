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

class Info {
    constructor(regNo,pername,phNo,email,entryDt,entryT,exitT,expdt,expentryT,expexitT){
        this.vehicleNumber = regNo;
        this.personName = pername;
        this.phoneNumber = phNo;
        this.emailId = email;
        this.entryDate = entryDt;
        this.entryTime = entryT;
        this.exitTime = exitT;
        this.ExpectedDate = expdt;
        this.ExpectedentryTime = expentryT;
        this.ExpectedexitTime = expexitT;
    }
}

let latest_entry = new Info("NA","NA","NA","NA","NA","NA","NA","NA","NA","NA");

async function Addentry1(regNo,pername,phNo,email,entryDt,entryT){

    // console.log("hi,entered 1");
    let temp = "NA";
    latest_entry = new Info(regNo,pername,phNo,email,entryDt,entryT,temp,temp,temp,temp);
    // const query = { vehicleNumber : regNo,personName: pername,phoneNumber: phNo,emailId: email,entryDate: entryDt,entryTime: entryT,exitTime: temp,ExpectedDate: temp,ExpectedentryTime: temp,ExpectedexitTime: temp};
    //  const result = await Infodb.findOne(query);
    console.log(query);
    try{
        // temp = await Infodb.insertMany(query);
        await Infodb.create(query);
    }
    catch(err){
        console.log("failed to insert the document1");
        console.log(err);
    }
    return true;
};

async function Addentry2(regNo,name,phNo,email,expDate,expentryT,expexitT){
    // console.log("hi,entered 2");
    let temp = "NA";
    latest_entry = new Info(regNo,name,phNo,email,temp,temp,temp,expDate,expentryT,expexitT)
    // const query = {vehicleNumber : regNo,personName: name,phoneNumber: phNo,emailId: email,entryDate: temp,entryTime: temp,exitTime: temp,ExpectedDate: expDate,ExpectedentryTime: expentryT,ExpectedexitTime: expexitT};
    console.log(query);
    try{
        // temp = await Infodb.insertMany(query);
        await Infodb.create(query);
    }
    catch(err){
        console.log("failed to insert the document2");
        console.log(err);
    }
    return true;
}

async function displayActiveEntries(){
    try {
    const inVehicles = await Infodb.find({exitTime:"NA"});
    return inVehicles;
    }
    catch(err)
    {
        console.error('Error fetching in vehicles: ', err);
        throw err;
    }
}

async function displaylatestEntry(){
    try{
        // console.log("HAHHA");
        // console.log("1",latest_entry);
        return latest_entry;
    }
    catch(err)
    {
        console.error('Error in displaying latest vehicles: ',err);
        throw err;
    }
}

//module.exports = mongoose.model("Info",InfoSchema);
module.exports = {Addentry1,Addentry2,displayActiveEntries,displaylatestEntry};
