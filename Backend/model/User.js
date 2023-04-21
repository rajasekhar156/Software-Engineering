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
    EmailId: String,
    userPwd: String
});

const Userdb = mongoose.model("user",UserSchema);

class User
{
    #userId;
    #personName;
    #personNumber;
    #emailId;
    #userPwd;

    constructor(UserId = "",PersonName = "",PersonNumber = "",EmailId = "",UserPwd = "")
    {
        this.#userId=UserId;
        this.#personName=PersonName;
        this.#personNumber=PersonNumber;
        this.#emailId=EmailId;
        this.#userPwd=UserPwd;
    }

    getuserId(){
        return this.#userId;
    }

    getpersonName(){
        return this.#personName;
    }

    getpersonNumber(){
        return this.#personNumber;
    }

    getemailId(){
        return this.#emailId;
    }

    getuserPwd(){
        return this.#userPwd;
    }

    setuserId(UserId){
        this.#userId = UserId;
    }

    setpersonName(PersonName){
        this.#personName = PersonName;
    }

    setpersonNumber(PersonNumber){
        this.#personNumber = PersonNumber;
    }

    setemailId(EmailId){
        this.#emailId = EmailId;
    }

    setuserPwd(UserPwd){
        this.#userPwd = UserPwd;
    }

}

module.exports = {User,Userdb};