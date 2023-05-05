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
    exitDate: String,
    exitTime: String,
    ExpectedDate: String,
    ExpectedentryTime: String,
    SecurityUserId: String
  },
  {
    versionKey: false,
  }
);

const Infodb = mongoose.model("info", InfoSchema);

class Info {
  vehicleNumber;
  personName;
  phoneNumber;
  emailId;

  constructor(regNo,perName,phNo,emailId=""){
    this.vehicleNumber = regNo;
    this.personName = perName;
    this.phoneNumber = phNo;
    this.emailId = emailId;
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

  setsecurityUser(UserId,personName,PersonNumber,EmailId,UserPwd){
    this.#securityUser.setuserId(UserId);
    this.#securityUser.setpersonName(personName);
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
    
    const vehicle_Details = await Infodb.findOne({vehicleNumber: regNo}).sort({_id:-1}).limit(1);
    
    if(vehicle_Details==null){
      //change the value of variable corresponding to invalid.
      latest_entry.vehicleNumber = regNo;
      latest_entry.personName = temp;
      latest_entry.phoneNumber = temp;
      latest_entry.emailId = temp;
      // console.log("33-33-33-",latest_entry);
      return regNo;
    }
    else{
      latest_entry.vehicleNumber = regNo;
      latest_entry.personName = vehicle_Details.personName;
      latest_entry.phoneNumber = vehicle_Details.phoneNumber;
      latest_entry.emailId = vehicle_Details.emailId;
      const query = { vehicleNumber : regNo,personName: vehicle_Details.personName,phoneNumber: vehicle_Details.phoneNumber,emailId: vehicle_Details.emailId,entryDate: entryDt,entryTime: entryT,exitDate: temp,exitTime: temp,ExpectedDate: temp,ExpectedentryTime: temp};
      // console.log("33-33-33-",latest_entry);
      try{
        await Infodb.create(query);
      }
      catch(err){
          console.log("failed to insert the document1");
          console.log(err);
      }
    }
    return true;
  }

  async addlatestexitentry(regNo,exitDt,exitT){
    const vehicle_Details = await Infodb.findOne({vehicleNumber: regNo,exitTime: "NA",entryTime: { $ne: "NA" }}).sort({_id:-1}).limit(1);
    if(vehicle_Details!=null){
      latest_entry.vehicleNumber = regNo;
      latest_entry.personName = vehicle_Details.personName;
      latest_entry.phoneNumber = vehicle_Details.phoneNumber;
      latest_entry.emailId = vehicle_Details.emailId;
    }
    latest_entry.vehicleNumber = regNo;
    // const query = { vehicleNumber : regNo,personName: vehicle_Details.personName,phoneNumber: vehicle_Details.phoneNumber,emailId: vehicle_Details.emailId,entryDate: entryDt,entryTime: entryT,exitDate: temp,exitTime: temp,ExpectedDate: temp,ExpectedentryTime: temp};
    // console.log("33-33-33-",latest_entry);
    try{
      // await Infodb.create(query);  
      // console.log(exitDt,exitT);
            const vehicle_Details = await Infodb.findOneAndUpdate({vehicleNumber: regNo,exitTime: temp},{$set:{exitDate: exitDt,exitTime: exitT}});
      // const vehicle_Details = await Infodb.findOne({vehicleNumber: regNo}).sort({_id:-1}).limit(1);
      // console.log(vehicle_Details)
      return true;
    }
    catch(err){
        console.log("failed to edit the document1");
        console.log(err);
    }

  }

  // exit time done similarly, we have to update the entry in the database with no exit time and the same vehicle no.

  async Addentry1(regNo,pername,phNo,email,entryDt,entryT){

    latest_entry.vehicleNumber = regNo;
    latest_entry.personName = pername;
    latest_entry.phoneNumber = phNo;
    latest_entry.emailId = email;

    const query = { vehicleNumber : regNo,personName: pername,phoneNumber: phNo,emailId: email,entryDate: entryDt,entryTime: entryT,exitDate: temp,exitTime: temp,ExpectedDate: temp,ExpectedentryTime: temp};
    
    // console.log(query);
    try{
        await Infodb.create(query);
    }
    catch(err){
        console.log("failed to insert the document1");
        console.log(err);
    }
    return true;
  };

  async Addentry2(regNo,pername,phNo,email,expDate,expentryT){
    
    const query = { vehicleNumber : regNo,personName: pername,phoneNumber: phNo,emailId: email,entryDate: temp,entryTime: temp,exitDate: temp,exitTime: temp,ExpectedDate: expDate,ExpectedentryTime: expentryT};

    // console.log(query);
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
        console.log("13-",latest_entry)
        const vehicle_Details = await Infodb.findOne({vehicleNumber: latest_entry.vehicleNumber}).sort({_id:-1}).limit(1);
        if(vehicle_Details==null){
          return latest_entry;
        }
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
              exitDate: temp,
              exitTime: temp,
              ExpectedDate: temp,
              ExpectedentryTime: temp,
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
      const user_details = await Userdb.find(query);
      // console.log(user_details);
      if(user_details.length !== 0){
        // console.log("sasj",user_details[0].userPwd);
        return user_details[0].userPwd;
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

  async rmlatestentry(){
    // latest_entry = new Info(temp,temp,temp,temp);
    latest_entry.vehicleNumber = temp;
    latest_entry.personName = temp;
    latest_entry.phoneNumber = temp;
    latest_entry.emailId = temp;
  }

}

module.exports = {Gate, Infodb}
