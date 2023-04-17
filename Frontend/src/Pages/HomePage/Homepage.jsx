import React, {useState, useEffect} from "react"
import AppBar from '@mui/material/AppBar';
import {Box, Grid} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import {Typography, TextField, FormControlLabel, Checkbox, CardMedia} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export const Homepage = (props) =>{

// class Homepage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         valid : 0,
    //         vehicleno : "TS09AB1245",
    //         personName : "I. Rajasekhar",
    //         phoneNumber : "9618084649",
    //         personEmail : "cs20btech11020@iith.ac.in",
    //         entryTime : "15:25",
    //         exitTime : "N/A",
    //     };
    // }

    // componentDidMount() {
    //     this.handleLatestEntry();
    // }
    const [valid,setvalid] = useState('');
    // const [inVehicles, setInVehicles] = useState([]);
    const [vehicleno,setvehicleNumber] = useState('TS15IK1028');
    const [personName,setpersonName] = useState('Rajasekhar I');
    const [phoneNumber,setphoneNumber] = useState('96180884649');
    const [personEmail,setpersonEmail] = useState('rajasekhar@gmail.com');
    const [entryTime,setentryTime] = useState('16:30');
    const [exitTime,setexitTime] = useState('22:00');

    const navigate = useNavigate();

    //let vehicleno  = "TS15IK1029";
    // let personName  = "Rajasekhar I";
    // let phoneNumber = "96180884649";
    // let personEmail = "rajasekhar@gmail.com";
    // let entryTime = "16:30";
    // let exitTime = "22:00";

    useEffect(()=>{
        async function handleLatestEntry(){

        // const handleLatestEntry = async() =>{
            console.log("hahaha2");
            let url = `http://localhost:5001/api/info/latestentry?`;
            try{
                const tp = await axios.post(url);
                console.log(tp.data);
                // setInVehicles(tp.data);
                // console.log(inVehicles);
                setvehicleNumber(tp.data.vehicleNumber);
                setpersonName(tp.data.personName);
                setphoneNumber(tp.data.phoneNumber);
                setpersonEmail(tp.data.emailId);
                setentryTime(tp.data.entryTime);
                setexitTime(tp.data.exitTime);
                // console.log(vehicleno,"2");
                // personName = tp.data.personName;
                // phoneNumber = tp.data.phoneNumber;
                // personEmail = tp.data.personEmail;
                // entryTime = tp.data.entryTime;
                // exitTime = tp.data.exitTime;
            }
            catch(err){
                console.error("Error fetching in latest entry: ", err);
            }
        }
        handleLatestEntry();
    },[]);
    
    const handleAdd=async(e)=>{
        e.preventDefault();
        navigate('/Add');
    };

    const handleActive=async(e)=>{
        e.preventDefault();
        navigate('/ActiveEntries');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        navigate('/Search');
    };

    // handleValid (){
    //     this.setState(state=>{
    //         if(state.valid===0){
    //             return {valid : 1}
    //         }
    //         else{
    //             return {valid : 0}
    //         }
    //     });
    // }

        return(
            <Box sx={{ flexGrow: 1 }} >
                <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 0.8 }}>
                        Latest Entry
                    </Typography>
                    <Button color="inherit" onClick={ handleActive} >Active Entries</Button>
                    <Button color="inherit" onClick={handleAdd}>Add Entry</Button>
                    <Button color="inherit" onClick={handleSearch}>Search Entry</Button>
                    </Toolbar>
                </AppBar>
                </Box>
                
                <Grid container>
                <Grid item xs={6} mt = {13}>
                <Box ml = {45} mt = {15} mr = {10}
                    sx={{ 
                        background: 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        marginBottom: 5,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}
                >
                <Card sx={{ Width: '15vw', height: '10vw', position: 'absolute', top: '33%', left: '15%'}}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Vehicle Reg. No.:
                        </Typography>
                        <TextField 
                            margin = "dense"
                            id="scanned-regNo"
                            value={vehicleno}
                            onChange={(event) => {
                                setvehicleNumber(event.target.value);
                            }}
                            InputProps={{
                                readOnly: true,
                                style: {
                                    height: "50px",
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                    color: '#890050',
                                },
                            }}
                        >${"TS191902020"}</TextField>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <FormControlLabel
                    control={<Checkbox 
                        onChange={e => setvalid(!valid)}
                        />}
                    label="Valid Request"/>{
                        valid? 
                        <div >
                            <Card sx={{ Width: '225', height: '225', position: 'absolute', top: '58%', left: '15%'}}>
                                <CardMedia
                                    style = {{ height: 220, width: 225}}
                                    image={require('./raita.png')} // require image
                                    title="valid entry"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                    Valid
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    : 
                        <div >
                            <Card sx={{ Width: '225', height: '225', position: 'absolute', top: '58%', left: '15%'}}>
                                <CardMedia
                                    style = {{ height: 220, width: 225}}
                                    image={require('./wrang.png')} // require image
                                    title="invalid entry"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                    Invalid
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    }
                </Box>
                </Grid>
                <Grid item xs={6} mt = {13}>
                {/* <button onClick={() => this.props.history.push('/Add')}>Go to new route</button> */}
                    <Box sx={{ 
                        background: 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        marginBottom: 5,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}>
                        <Typography gutterBottom variant="h4" component="div" align="right" ml = {10} mr = {17.3} >
                            Name           :
                        </Typography>
                        <TextField 
                            margin-left = "dense"
                            id="name"
                            backgroundColor = "red"
                            value={personName}
                            onChange={(event) => {
                                setpersonName(event.target.value);
                            }}
                            InputProps={{
                                readOnly: true,
                                style: {
                                    height: "50px",
                                    fontSize: "25px",
                                },
                            }}
                        >${personName}</TextField>
                    </Box>
                    <Box sx={{ 
                        background: 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        marginBottom: 5,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}>
                        <Typography gutterBottom variant="h4" component="div" align="right" ml = {10} mr = {8} >
                            Mobile No.      :
                        </Typography>
                        <TextField 
                            margin-left = "dense"
                            id="phoneNo"
                            backgroundColor = "red"
                            value={phoneNumber}
                            onChange={(event) => {
                                setphoneNumber(event.target.value);
                            }}
                            // defaultValue={phoneNumber}
                            InputProps={{
                                readOnly: true,
                                style: {
                                    height: "50px",
                                    fontSize: "25px",
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ 
                        background: 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        marginBottom: 5,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}>
                        <Typography gutterBottom variant="h4" component="div" align="right" ml = {10} mr = {16.2} >
                            E-mail         :
                        </Typography>
                        <TextField 
                            margin-left = "dense"
                            id="email"
                            backgroundColor = "red"
                            value={personEmail}
                            onChange={(event) => {
                                setpersonEmail(event.target.value);
                            }}
                            // defaultValue= {personEmail}
                            InputProps={{
                                readOnly: true,
                                style: {
                                    height: "50px",
                                    fontSize: "25px",
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ 
                        background: 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        marginBottom: 5,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}>
                        <Typography gutterBottom variant="h4" component="div" align="right" ml = {10} mr = {7.85} >
                            Entry Time     :
                        </Typography>
                        <TextField 
                            margin-left = "dense"
                            id="entTime"
                            backgroundColor = "red"
                            value={entryTime}
                            onChange={(event) => {
                                setentryTime(event.target.value);
                            }}
                            // defaultValue={entryTime}
                            InputProps={{
                                readOnly: true,
                                style: {
                                    height: "50px",
                                    fontSize: "25px",
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ 
                        background: 'red',
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        marginBottom: 5,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        }}>
                        <Typography gutterBottom variant="h4" component="div" align="right" ml = {10} mr = {10.5} >
                            Exit Time      :
                        </Typography>
                        <TextField 
                            margin-left = "dense"
                            id="exitT"
                            backgroundColor = "red"
                            value={exitTime}
                            onChange={(event) => {
                                setexitTime(event.target.value);
                            }}
                            // defaultValue={exitTime}
                            InputProps={{
                                readOnly: true,
                                style: {
                                    height: "50px",
                                    fontSize: "25px",
                                },
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            </Box>
        );
};

// export default withRouter(Homepage);
