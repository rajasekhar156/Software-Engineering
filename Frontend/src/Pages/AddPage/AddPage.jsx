import React, {useState} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Checkbox, Grid, Paper} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from '../../logo.png';


export const Add = (props) =>{
    const [regNo,setregNo] = useState('');
    const [name,setname] = useState('');
    const [phNo,setphNo] = useState('');
    const [email,setemail] = useState('');
    const [online,setonline] = useState('');
    const [expDate,setexpDate] = useState('');
    const [expentryT,setexpentryT] = useState('');
    const [expexitT,setexpexitT] = useState('');

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
        navigate('/');
    }
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
            url = `http://localhost:5001/api/Addentry?regNo=${regNo}&name=${name}&phNo=${phNo}&email=${email}&online=${1}&expDate=${expDate}&expentryT=${expentryT}&expexitT=${expexitT}`;
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

    const theme = createTheme({
        palette: {
            primary: {
              main: '#FFA559',
              dark: '#454545', 
            },
        },
        components: {
          MuiInputBase: {
            styleOverrides: {
              input: {
                backgroundColor: '#7f7c7c',
                color: '#FFE6C7',
                fontWeight: 'bold',
                fontSize: '18.5px',
              },
            },
          },
        },
      });
    
    return(
        // Creating a form to add a new entry to the database
        <ThemeProvider theme={theme}>
        <Grid container component="main" >
        <Grid width={1847} height={980} component={Paper} elevation={6} square backgroundColor={"#454545"}>
            <Box position={"absolute"} top={"0%"} left={"0%"} width={1847} >
            <AppBar position="static">
                <Toolbar >
                <Link href="/">
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
            <Box width = {1200} position={"absolute"} left={"18%"} top={"16%"} sx={{ flexGrow: 1 }}>
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
                    sx={{color: '#FFE6C7', fontColor: '#FFE6C7'}}
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
                    <TextField
                        type="time"
                        variant='outlined'
                        color='secondary'
                        label="Expected exit time"
                        value={expexitT}
                        onChange={e => setexpexitT(e.target.value)}
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
                sx={{ mt: 1, mb: 2, color: '#454545', backgroundColor: '#FFE6C7'}}
            >
            <span style={{fontWeight: 'bold', fontSize: '22px'}}>Submit</span>
            </Button>
            </form>
            </Box>
        </Grid>
        </Grid>
        </ThemeProvider>
    );
}