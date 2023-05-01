import React, {useState, useEffect } from "react"
import AppBar from '@mui/material/AppBar';
import {Box, Grid} from '@mui/material';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import {Typography, TextField, FormControlLabel, Checkbox, CardMedia} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../../logo.png';

export const Homepage = (props) =>{

    const [open, setOpen] = useState(localStorage.getItem("isLoggedIn"));
    const [valid,setvalid] = useState('');
    const [fileCleared, setFileCleared] = useState(false);
    // const [isFirstLoad, setIsFirstLoad] = useState(true);
    // const [isVisible, setVisible] = useState(false);
    const [final,setfinal] = useState('NA');
    const [oldvalue,setoldvalue] = useState('NA');
    // const [inVehicles, setInVehicles] = useState([]);
    const [vehicleno,setvehicleNumber] = useState('NA');
    const [personName,setpersonName] = useState('NA');
    const [phoneNumber,setphoneNumber] = useState('NA');
    const [personEmail,setpersonEmail] = useState('NA');
    const [entryTime,setentryTime] = useState('NA');
    const [exitTime,setexitTime] = useState('NA');

    const navigate = useNavigate();
    //let vehicleno  = "TS15IK1029";
    // let personName  = "Rajasekhar I";
    // let phoneNumber = "96180884649";
    // let personEmail = "rajasekhar@gmail.com";
    // let entryTime = "16:30";
    // let exitTime = "22:00";

    let fetchData = async() =>{
        let resp = await fetch("http://localhost:3000/highest.txt");
        let temp = await resp.text();
        setfinal(temp);
        // console.log("66-",oldvalue,"33-",final);
    }

    const handleLatestEntry = async()=>{
        // console.log("hahaha2");
        let url = `http://localhost:5001/api/latestentry?`;
        try{
            // console.log("avatar");
                const tp = await axios.post(url);
                setvehicleNumber(tp.data.vehicleNumber);
                // setvehicleNumber("thota");
                setpersonName(tp.data.personName);
                setphoneNumber(tp.data.phoneNumber);
                setpersonEmail(tp.data.emailId);
                if(tp.data.personName == "NA"){
                    let temp = "NA"
                    // console.log("293903");
                    setentryTime(temp);
                    setexitTime(temp);
                }
                else{
                    setentryTime(tp.data.entryTime);
                    setexitTime(tp.data.exitTime);
                }
                // console.log(vehicleno,personName,phoneNumber,personEmail,entryTime,exitTime);
        }
        catch(err){
            console.error("Error fetching in latest entry: ", err);
        }
    };

    const addlatestentry = async() =>{
        // console.log("41-",oldvalue,"31-",final);
        if(oldvalue!=final && final!=''){
            const dATE = new Date();
            let date = "";
            date = date.concat(dATE.getFullYear(),"-",dATE.getMonth(),"-",dATE.getDate());
            let time = "";
            time = time.concat(dATE.getHours(),":",dATE.getMinutes());
            console.log(final);
            let url = `http://localhost:5001/api/AddLatestEntry?regNo=${final}&date=${date}&time=${time}`;
            const tp = await axios.post(url);
            if(tp.data==1){
                console.log("hahaha");
            }
            else{
                console.log("ajjajaj-",tp.data);
                // setvehicleNumber("araha");
                // console.log(tp.data,"sarandeep",vehicleno);
                // setfinal(tp.data);
            }
            // console.log("hsjjs");
        }
        //console.log("4-",final);
        if(oldvalue!=final){
            setoldvalue(final);
        }
        // console.log("42-",oldvalue,"32-",final);
    };

    useEffect(()=>{
        const interval = setInterval(() => {
            window.localStorage.setItem("finaldatastoragevalue",final);
            window.localStorage.setItem("oldvaluedatastoragevalue",oldvalue);
            // console.log("789-",final,oldvalue);
            fetchData();
            addlatestentry();
        },1000);
        handleLatestEntry();
        return () => clearInterval(interval);
    },[final,oldvalue]);

    useEffect(()=>{
        let data = window.localStorage.getItem("finaldatastoragevalue");
        setfinal(data);
        data = window.localStorage.getItem("oldvaluedatastoragevalue");
        setoldvalue(data);
    },[]);
    
    const handleAdd = async(e) =>{
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

    const handleLogOut = async (e) => {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        let url = `http://localhost:5001/api/logout`;
        const tp = await axios.post(url);
        localStorage.clear();
        navigate('/');
    }

    const handleURLChange = () => {
        navigate('/');
    };

    if (localStorage.getItem("isLoggedIn") == "true") {
        return (
            // <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }} >
                <Box position={"absolute"} top={"0%"} left={"0%"} width={"100%"} >
                    <AppBar position="static">
                        <Toolbar >
                            <Link>
                                <Box
                                    component="img"
                                    sx={{ height: 54 }}
                                    alt="Logo"
                                    src={logo}
                                />
                            </Link>
                            <Box position={"absolute"} left={"20%"} width={700}>
                                <Button color="inherit" sx={{ fontWeight: '1000', fontSize: '15px' }} variant="outlined">Latest Entry</Button>
                                <Button color="inherit" onClick={handleAdd} sx={{ fontWeight: '800', fontSize: '15px' }}  >Add Entry</Button>
                                <Button color="inherit" onClick={handleActive} sx={{ fontWeight: '800', fontSize: '15px' }}>Active Entries</Button>
                                <Button color="inherit" onClick={handleSearch} sx={{ fontWeight: '800', fontSize: '15px' }}>Search Entry</Button>
                            </Box>
                            <Button color="inherit" onClick={handleLogOut} sx={{ fontWeight: '400', fontSize: '12px', position: 'absolute', fontWeight: 'bold', right: '30px' }} >logout</Button>

                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid container>
                    <Grid item xs={6} mt={13}>
                        <Box ml={45} mt={15} mr={10}
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
                            <Card sx={{ Width: '15vw', height: '10vw', position: 'absolute', top: '33%', left: '15%' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h4" component="div">
                                            Vehicle Reg. No.:
                                        </Typography>
                                        <TextField
                                            margin="dense"
                                            id="scanned-regNo"
                                            value={vehicleno}
                                            onChange={(event) => {
                                                setvehicleNumber(event.target.value);
                                            }}
                                            InputProps={{
                                                // readOnly: true,
                                                style: {
                                                    height: "50px",
                                                    fontSize: "25px",
                                                    fontWeight: "bold",
                                                    color: '#890050',
                                                },
                                            }}
                                        />
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            {
                                (personName !== 'NA') ?
                                    <div >
                                        <Card sx={{ Width: '225', height: '225', position: 'absolute', top: '58%', left: '20%' }}>
                                            <CardMedia
                                                style={{ height: 220, width: 225 }}
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
                                        <Card sx={{ Width: '225', height: '200', position: 'absolute', top: '58%', left: '20%' }}>
                                            <CardMedia
                                                style={{ height: 220, width: 225 }}
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
                    <Grid item xs={6} mt={13}>
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
                            <Typography gutterBottom variant="h4" component="div" align="right" ml={10} mr={17.3} >
                                Name           :
                            </Typography>
                            <TextField
                                margin-left="dense"
                                id="name"
                                backgroundColor="red"
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
                            <Typography gutterBottom variant="h4" component="div" align="right" ml={10} mr={8} >
                                Mobile No.      :
                            </Typography>
                            <TextField
                                margin-left="dense"
                                id="phoneNo"
                                backgroundColor="red"
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
                            <Typography gutterBottom variant="h4" component="div" align="right" ml={10} mr={16.2} >
                                E-mail         :
                            </Typography>
                            <TextField
                                margin-left="dense"
                                id="email"
                                backgroundColor="red"
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
                            <Typography gutterBottom variant="h4" component="div" align="right" ml={10} mr={7.85} >
                                Entry Time     :
                            </Typography>
                            <TextField
                                margin-left="dense"
                                id="entTime"
                                backgroundColor="red"
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
                            <Typography gutterBottom variant="h4" component="div" align="right" ml={10} mr={10.5} >
                                Exit Time      :
                            </Typography>
                            <TextField
                                margin-left="dense"
                                id="exitT"
                                backgroundColor="red"
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
            // </Container>
        );
    }
    else
    {
        return(
            <div>
                {/* <Snackbar autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Please Login First.
                    </Alert>
                </Snackbar> */}
                {handleURLChange()}
                {/* {handleLogOut()} */}
                {/* <h2>Please Login First</h2> */}
            </div>
        );
    }
        
};

// export default withRouter(Homepage);
