const router = require("express").Router();
const {Gate} = require("../model/Info");

let gate = new Gate();
 
router.post("/",async(req,res) =>{
    const username = req.query.userid;
    const userpwd = req.query.userpwd;
    const gateno = req.query.gateno;

    gate.setgateNo(gateno);

    const isvalid = await gate.isValidLogin(username,userpwd);

    if(isvalid){
        res.status(200).json("1");
    }
    else{
        res.status(200).json("0");
    }
});

router.post("/AddLatestEntry",async(req,res)=>{
  const regNo = req.query.regNo;
  const date = req.query.date;
  const time =  req.query.time;
  try{
    // console.log("156156");
    isvalid = await gate.AddLatestEntry(regNo,date,time);
    if(isvalid===true){
      res.status(200).json("1");
    }
    else{
      res.status(200).json(isvalid);
    }
  }
  catch(error){
    console.error(error);
    res.status(200).json("0");
  }
});

router.post("/Addentry",async(req,res)=>{
    const regNo = req.query.regNo;
    const pername = req.query.name;
    const phNo = req.query.phNo;
    const email = req.query.email;
    let isvalid;

    try{
        if(req.query.online==='1'){
            const expDate = req.query.expDate;
            const expentryT = req.query.expentryT;
            isvalid = await gate.Addentry2(regNo,pername,phNo,email,expDate,expentryT);
        }
        else{
            const date = req.query.date;
            const time =  req.query.time;
            isvalid = await gate.Addentry1(regNo,pername,phNo,email,date,time);
        }
        res.status(200).json("1");
    }
    catch(error){
        console.error(error);
        res.status(200).json("0");
    }
});

router.post("/latestentry", async (req, res) => {
    try{
        const latest_entry = await gate.displaylatestEntry();
        // console.log(latest_entry);
        // if(latest_entry==false){
        //   res.status(200).send(latest_entry);
        // }
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
      const vehicle_Details = await gate.vehicleDetails(vehicleNumberSc);
      // console.log(vehicle_Details);
      if(vehicle_Details.vehicleNumber=="NA"){
        // console.log("wrwt");
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
      const inVehicles = await gate.displayActiveEntries();
      // console.log(inVehicles);
      res.status(200).send(inVehicles);
    } 
    catch (err) 
    {
      console.error('Error fetching in vehicles: ', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  router.get('/forgotpass', async(req,res) => {
    const username = req.query.userName;
    try 
    {
      const pass = await gate.getUserPass(username);
      if(pass=="")
      {
        res.status(200).send("");
      }
      else
      {
       res.status(200).send(pass);
      }
    } 
    catch (err) 
    {
      console.error('Error fetching in password: ', err);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }) ;
module.exports = router;