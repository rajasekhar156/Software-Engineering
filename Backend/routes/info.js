const router = require("express").Router();
const {Addentry1,Addentry2} = require("../model/Info")

// Create Info 
router.post("/Addentry",async(req,res)=>{
    const regNo = req.query.regNo;
    const pername = req.query.name;
    const phNo = req.query.phNo;
    const email = req.query.email;
    let isvalid;
    try{
    if(req.query.online==='1'){
        // console.log("byeee");
        const expDate = req.query.expDate;
        const expentryT = req.query.expentryT;
        const expexitT = req.query.expexitT;
        isvalid = await Addentry2(regNo,pername,phNo,email,expDate,expentryT,expexitT);
    }
    else{
        // console.log("tatat");
        const date = req.query.date;
        const time =  req.query.time;
        isvalid = await Addentry1(regNo,pername,phNo,email,date,time);
    }
    res.status(200).json("1");
    }
    catch(error){
        console.error(error);
        res.status(200).json("0");
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
// Get Info list or Search Info by rfid  query parameters
router.get("/Addentry", async (req, res) => {
    // const vehicleNumber = req.query.vehicleNumber;

})
// Get Info by ID

// Update Info

// Delete Info

module.exports = router;