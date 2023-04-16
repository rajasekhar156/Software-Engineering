const router = require("express").Router();
const {Addentry1,Addentry2} = require("../model/Info")

// Create Info 
router.post("/Addentry",async(req,res)=>{
    const regNo = req.query.regNo;
    const pername = req.query.name;
    const phNo = req.query.phNo;
    const email = req.query.email;
    try{
    if(req.query.online==='1'){
        console.log("byeee");
        const expDate = req.query.expDate;
        const expentryT = req.query.expentryT;
        const expexitT = req.query.exitT;
        isvalid = Addentry2(regNo,pername,phNo,email,expDate,expentryT,expexitT);
    }
    else{
        console.log("tatat");
        const date = req.query.date;
        const time =  req.query.time;
        await Addentry1(regNo,pername,phNo,email,date,time);
    }
    res.sendStatus(201);
    }
    catch(error){
        console.error(error);
        res.sendStatus(500);
    }
    // const isvalid  =  await isValidLogin(username,userpwd);
    // if(isvalid){
    //     console.log("1");
    //     res.status(200).json("1");
    // }
    // else{
    //     console.log("0");
    //     res.status(200).json("0");
    // }
});
// Get Info list or Search Info by rfid or Infoid query parameters
router.get("/Addentry", async (req, res) => {
    const infoId = req.query.infoId;
    const vehicleNumber = req.query.vehicleNumber;

})
// Get Info by ID

// Update Info

// Delete Info

module.exports = router;