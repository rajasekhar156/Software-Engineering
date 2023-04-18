const router = require("express").Router();
const {Addentry1,Addentry2,displayActiveEntries,displaylatestEntry,vehicleDetails} = require("../model/Info")

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
router.post("/latestentry", async (req, res) => {
    try{
        const latest_entry = await displaylatestEntry();
        console.log(latest_entry);
        res.status(200).send(latest_entry);
    }
    catch (err){
        console.error('Error fetching in latest entry vehicle: ', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/vehicleNumber', async (req, res) => {

    const vehicleNumberSc = req.query.vehicleNumber;

    try 
    {
      const vehicle_Details = await vehicleDetails(vehicleNumberSc);
      console.log(vehicle_Details);
      if(vehicle_Details.vehicleNumber=="NA"){
        console.log("wrwt");
        res.status(200).send("1");
        
      }
      else{
        res.status(200).send(vehicle_Details);
      }
    } 
    catch (err) 
    {
      console.error('Error fetching in vehicles2: ', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });


router.get('/in-vehicles', async (req, res) => {
    try 
    {
      const inVehicles = await displayActiveEntries();
      console.log(inVehicles);
      res.status(200).send(inVehicles);
    } 
    catch (err) 
    {
      console.error('Error fetching in vehicles: ', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
