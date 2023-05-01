import React, {useState} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Checkbox, Grid, Paper, Card, CardMedia} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import { isLoggedIn, setLoggedIn } from "../global";

import logo from '../../logo.png';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const Add = (props) =>{
    const [regNo,setregNo] = useState('');
    const [name,setname] = useState('');
    const [phNo,setphNo] = useState('');
    const [email,setemail] = useState('');
    const [online,setonline] = useState('');
    const [expDate,setexpDate] = useState('');
    const [expentryT,setexpentryT] = useState('');

    const navigate = useNavigate();
    
    const handleLatestEntry = async(e) =>{
        e.preventDefault();
        navigate('/Home');
    };
    const handleActive = async (e) => {
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
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            navigate('/');
        }}

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let url;
        if(!online){
            const dATE = new Date();
            let date = "";
            date = date.concat(dATE.getFullYear(),"-",dATE.getMonth(),"-",dATE.getDate());
            let time = "";
            time = time.concat(dATE.getHours(),":",dATE.getMinutes());
            url = `http://localhost:5001/api/Addentry?regNo=${regNo}&name=${name}&phNo=${phNo}&email=${email}&online=${0}&date=${date}&time=${time}`;
        }
        else{
            url = `http://localhost:5001/api/Addentry?regNo=${regNo}&name=${name}&phNo=${phNo}&email=${email}&online=${1}&expDate=${expDate}&expentryT=${expentryT}`;
        }
        
        const tp = await axios.post(url);
        console.log(tp.status);
        if(tp.data === "1"){
            alert("success");
            navigate('/Home');
        }
        else if(tp.data === "0"){
            alert("OOPS! Invalid Login Details");
        }
    }

    const theme = createTheme({});

    const handleURLChange = () => {
        navigate('/');
    };

    if (localStorage.getItem("isLoggedIn") == "true") {
    return(
        // Creating a form to add a new entry to the database
        <ThemeProvider theme={theme}>
            <div width = "100%" height = "100%">
                <Card sx={{ Width: '100%', height: '100%'}}>
                    <CardMedia
                        style={{ height: 960, width: 1840, opacity: 0.5 }}
                        image={require('../gate.jpg')} // require image
                        title="invalid entry"
                    />
                </Card>
            </div>
        <Grid container component="main" >
        <Grid width={"100%"} height={"100%"} component={Paper} elevation={6} square>
            <Box position={"absolute"} bgcolor={"#000000"} top={"0%"} left={"0%"} width={1845} >
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
                <Button color="inherit" onClick={handleLatestEntry} sx={{fontWeight : '800', fontSize: '15px'}}>Latest Entry</Button>
                            <Button color="inherit" sx={{ fontWeight: '1000', fontSize: '15px' }} variant="outlined">Add Entry</Button>
                <Button color="inherit" onClick={handleActive} sx={{fontWeight : '800', fontSize: '15px'}}>Active Entries</Button>
                <Button color="inherit" onClick={handleSearch} sx={{fontWeight : '800', fontSize: '15px'}}>Search Entry</Button>
                </Box>
                        <Button color="inherit" onClick={handleLogOut} sx={{ fontWeight: '400', fontSize: '12px', position: 'absolute', fontWeight: 'bold', right: '30px' }} >logout</Button>
                
            </Toolbar>
            </AppBar>
            </Box>
            <Box width = {"58%"} bgcolor = "#fff" position={"absolute"} left={"18%"} paddingLeft={10} paddingRight={10} paddingTop={5} paddingBottom={5} top={"15%"} right = {"18.5%"} sx={{ flexGrow: 1}}>
            <form className="add-entry-form" onSubmit={handleSubmit}>
            <TextField
                type="text"
                variant='outlined'
                color='primary'
                label="Vehicle Registration Number"
                value={regNo}
                onChange={e => setregNo(e.target.value)}
                fullWidth
                required
                margin="normal"
                sx={{mb: 4}}
            />
            <TextField
                type="text"
                variant='outlined'                
                color='primary'
                label="Name"
                value={name}
                onChange={e => setname(e.target.value)}
                fullWidth
                required
                sx={{mb: 4}}
            />
            <TextField
                type="number"
                variant='outlined'
                color='primary'
                label="Phone Number"
                value={phNo}
                onChange={e => setphNo(e.target.value)}
                fullWidth
                required
                sx={{mb: 4}}
            />
            <TextField
                type="email"
                variant='outlined'
                color='primary'
                label="Email"
                value={email}
                onChange={e => setemail(e.target.value)}
                fullWidth
                required
                sx={{mb: 4}}
            />

            <FormControlLabel
                control={<Checkbox 
                    onChange={e => setonline(!online)}
                    />}
                label="E-mail Request"/>{
                    online? 
                    <div>
                    <TextField
                        type="date"
                        variant='outlined'
                        color='secondary'
                        label="Expected arrival date"
                        value={expDate}
                        onChange={e => setexpDate(e.target.value)}
                        margin="normal"
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    <TextField
                        type="time"
                        variant='outlined'
                        color='secondary'
                        label="Expected entry time"
                        value={expentryT}
                        onChange={e => setexpentryT(e.target.value)}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    </div>
                 : ''}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, color: '#eae9e9'}}
            >
            <span style={{fontWeight: 'bold', fontSize: '22px'}}>Submit</span>
            </Button>
            </form>
            </Box>
        </Grid>
        </Grid>
        </ThemeProvider>
    );}
    else {
        return (
            <div>
                {handleURLChange()}
            </div>
        );}
}