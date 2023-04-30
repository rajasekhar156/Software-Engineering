const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const {User,Userdb} = require("./User");
const { query } = require("express");

const InfoSchema = new mongoose.Schema(
  {
    vehicleNumber: { type: String, required: true },
    personName: String,
    phoneNumber: String,
    emailId: String,
    entryDate: String,
    entryTime: String,
    exitTime: String,
    ExpectedDate: String,
    ExpectedentryTime: String,
    ExpectedexitTime: String,
    SecurityUserId: String
  },
  {
    versionKey: false,
  }
);

const Infodb = mongoose.model("info", InfoSchema);

class Info {
  vehicleNo;
  personName;
  phoneNo;
  email;

  constructor(regNo,perName,phNo,email=""){
    this.vehicleNo = regNo;
    this.personName = perName;
    this.phoneNo = phNo;
    this.email = email;
  }

}

let temp = "NA";
let latest_entry = new Info(temp,temp,temp,temp);

class Gate {
  #securityUser;
  #gateNo;

  constructor(gateNo){
    this.#gateNo = gateNo;
    this.#securityUser = new User();
  }

  getgateNo(){
    return this.#gateNo;
  }

  setgateNo(gateNo){
    this.#gateNo = gateNo;
  }

  setsecurityUser(UserId,PersonName,PersonNumber,EmailId,UserPwd){
    this.#securityUser.setuserId(UserId);
    this.#securityUser.setpersonName(PersonName);
    this.#securityUser.setpersonNumber(PersonNumber);
    this.#securityUser.setemailId(EmailId);
    this.#securityUser.setuserPwd(UserPwd);
  }

  async isValidLogin (UserName,UserPwd){
    const query = {userId: UserName,userPwd : UserPwd};
    // console.log(UserName,UserPwd);
    const result = await Userdb.findOne(query);
    // console.log("ajaja",result);
    // console.log(result);
    if(result!== null){
        this.setsecurityUser(result.userName,result.personName,result.personNumber,result.userPwd);
        return true;
    }
    else{
        return false;
    }
  }

  async AddLatestEntry(regNo, entryDt, entryT){
    // search using reg NO
    // const vehicle_Details = await Infodb.findOne({vehicleNumber: latest_entry.vehicleNo}).sort({_id:-1}).limit(1);
    // we get an object, take the existing fields and add a new entry into the db with updated timings
  }

  // exit time done similarly, we have to update the entry in the database with no exit time and the same vehicle no.

  async Addentry1(regNo,pername,phNo,email,entryDt,entryT){

    latest_entry.vehicleNo = regNo;
    latest_entry.personName = pername;
    latest_entry.phoneNo = phNo;
    latest_entry.email = email;

    const query = { vehicleNumber : regNo,personName: pername,phoneNumber: phNo,emailId: email,entryDate: entryDt,entryTime: entryT,exitTime: temp,ExpectedDate: temp,ExpectedentryTime: temp,ExpectedexitTime: temp};
    
    console.log(query);
    try{
        await Infodb.create(query);
    }
    catch(err){
        console.log("failed to insert the document1");
        console.log(err);
    }
    return true;
  };

  async Addentry2(regNo,name,phNo,email,expDate,expentryT,expexitT){
    
    const query = { vehicleNumber : regNo,personName: pername,phoneNumber: phNo,emailId: email,entryDate: temp,entryTime: temp,exitTime: temp,ExpectedDate: expDate,ExpectedentryTime: expentryT,ExpectedexitTime: expexitT};

    console.log(query);
    try{
        await Infodb.create(query);
    }
    catch(err){
        console.log("failed to insert the document2");
        console.log(err);
    }
    return true;
  };

  async displayActiveEntries() {
    try {
      const inVehicles = await Infodb.find({
        exitTime: "NA",
        entryTime: { $ne: "NA" },
      });
      return inVehicles;
    } catch (err) {
      console.error("Error fetching in vehicles: ", err);
      throw err;
    }
  };

  async displaylatestEntry(){
    try{

        const vehicle_Details = await Infodb.findOne({vehicleNumber: latest_entry.vehicleNo}).sort({_id:-1}).limit(1);

        return vehicle_Details;
    }
    catch(err)
    {
        console.error('Error in displaying latest vehicles: ',err);
        throw err;
    }
  };

  async vehicleDetails(vehicleNumberSc){
    try {

        const vehicle_Details = await Infodb.find({vehicleNumber: vehicleNumberSc});
        if(vehicle_Details.length == 0){
            const query = { 
              vehicleNumber : temp,
              personName: temp,
              phoneNumber: temp,
              emailId: temp,
              entryDate: temp,
              entryTime: temp,
              exitTime: temp,
              ExpectedDate: temp,
              ExpectedentryTime: temp,
              ExpectedexitTime: temp
            };
          return query;
        }
        return vehicle_Details;
    }
    catch(err)
    {
        console.error('Error fetching in vehicles1: ', err);
        throw err;
    }
  };

  async getUserPass(userName){
    try{
      const query = {userId: userName};
      const user_details = await Userdb.findOne(query);
      if(user_details!== null){
        return user_details.userPwd;
      }
      else{
          return "";
      }
    }
    catch(err)
    {
      console.error('Error fetching in user details:', err);
      throw err;
    }
  };

}

module.exports = {Gate}
