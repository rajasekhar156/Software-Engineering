const router = require("express").Router();
const User = require("../model/User")

// Create Student 
router.post("/",async(req,res) =>{
    const newUser = new User(req.body);
    console.log(req.body);
    // try {
    //     // const savedUser = await newUser.save();
    //     if(newUser.userId){
    //         findUser = await User.find({
    //             userId : newUser.userId,
    //             userPwd : newUser.userPwd,
    //         });
    //     }
    //     res.status(200).json(findUser);
    //     console.log(findUser);
    // }
    // catch (error){
    //     res.status(500).json({ error: error});
    // }
});
// Get Student list or Search Student by rfid or studentid query parameters
router.get("/",async(req,res) =>{
    res.sendFile(__dirname + "../../Frontend");
});

module.exports = router;