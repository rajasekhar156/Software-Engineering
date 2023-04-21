import React, {useState} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Checkbox} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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
    }
    const handleActive = async (e) => {
        e.preventDefault();
        navigate('/ActiveEntries');
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        navigate('/Search');
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
    
    return(
        // Bar to be given by Raja
        
        // Creating a form to add a new entry to the database
        <div className="add-entry">
            <Box sx={{ width : 1000}}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 0.8 }}>
                    Add Entry
                </Typography>
                <Button color="inherit" onClick={handleLatestEntry}>Latest Entry</Button>
                <Button color="inherit" onClick={handleActive}>Active Entries</Button>
                <Button color="inherit" onClick={handleSearch}>Search Entry</Button>
                </Toolbar>
            </AppBar>
            <form className="add-entry-form" onSubmit={handleSubmit}>
            <TextField
                type="text"
                variant='outlined'
                color='secondary'
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
                color='secondary'
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
                color='secondary'
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
                color='secondary'
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
            <Button variant="outlined" color="secondary" type="submit">Submit</Button>
            </form>
            </Box>
        </div>
    );
}