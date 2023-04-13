const router = require("express").Router();
const isValidLogin = require("../model/User");


// Create Student 
router.post("/",async(req,res) =>{
    const username = req.query.userid;
    const userpwd = req.query.userpwd;
    // console.log(username,userpwd,"82828");
    const isvalid  =  await isValidLogin(username,userpwd);
    if(isvalid){
        res.status(200).json("1");
    }
    else{
        res.status(200).json("0");
    }
    // const newUser = new Userdb({
    //     userName : req.query.userid,
    //     personName : "Raja",
    //     personNumber : "9618084648",
    //     userPwd : req.query.userpwd
    // });
    // Userdb.insertMany([newUser]);
    // 
});

// Get Student list or Search Student by rfid or studentid query parameters
router.get("/",async(req,res) =>{
    console.log("BBB");
});

module.exports = router;