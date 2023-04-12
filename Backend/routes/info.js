const router = require("express").Router();
const Info = require("../model/Info")
const path = require("path");

// Create Info 
router.post("/",async(req,res)=>{
    const newInfo = new Info(req.body);
    try {
        const savedInfo = await newInfo.save();
        res.status(200).json(savedInfo);
    }
    catch (error){
        res.status(500).json({ error: error});
    }
});
// Get Info list or Search Info by rfid or Infoid query parameters
router.get("/", async (req, res) => {
    //const infoId = req.query.infoId;
    const vehicleNumberSc = req.query.vehicleNumber;


    /*fucntion to search a particular vehicle number */


    if(vehicleNumberSc){
        try{
            let info;
            // if (infoId && vehicleNumber){
            //     Info= await Info.find({
            //         infoId: infoId,
            //         vehicleNumber: vehicleNumber
            //     });
            // } else if(infoId){

            // }
            if(vehicleNumberSc){
                info = await Info.find({vehicleNumber : vehicleNumberSc});
            }
            return res.status(200).json(info);
        } catch(error){
            return res.status(500).json({error: error});
        }
    }
})
// Get Info by ID

// Update Info

// Delete Info

module.exports = router;