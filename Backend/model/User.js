const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    personName: String,
    personNumber: String,
    userPwd: String
});

const Userdb = mongoose.model("user",UserSchema);

async function isValidLogin (username,userpwd){
    const query = {userName: username,userPwd : userpwd};
    // console.log(username,userpwd);
    const result = await Userdb.findOne(query);
    if(result!== null){
        return true;
    }
    else{
        return false;
    }
}

module.exports = isValidLogin;

// const Userdb = mongoose.model("user",UserSchema);

// Userdb.find(function(err,docs){
//     if(err){
//         console.log("error : ",err);
//     }
//     else{
//         console.log("success : ",docs);
//     }
// });
// console.log("2");

