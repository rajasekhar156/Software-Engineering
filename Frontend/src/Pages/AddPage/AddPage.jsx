import React, {useState} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormGroup, FormControlLabel, Checkbox} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Add = (props) =>{
    const [regNo,setregNo] = useState('');
    const [name,setname] = useState('');
    const [phNo,setphNo] = useState('');
    const [email,setemail] = useState('');
    const [online,setonline] = useState('');
    const [expDate,setexpDate] = useState('');
    const [entryT,setentryT] = useState('');
    const [exitT,setexitT] = useState('');

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
        navigate('/SearchPage');
    }


    const handleSubmit = async(e) =>{
        e.preventDefault();
    }
    
    return(
        // Bar to be given by Raja
        
        // Creating a form to add a new entry to the database
        <div className="add-entry">
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 0.8 }}>
                    Add Entry
                </Typography>
                <Button color="inherit" onClick={handleActive}>Active Entries</Button>
                <Button color="inherit" onClick={handleLatestEntry}>Latest Entry</Button>
                <Button color="inherit" onClick={handleSearch}>Search Entry</Button>
                </Toolbar>
            </AppBar>
            </Box>
            <FormGroup>
            <form className="add-entry-form" onSubmit={handleSubmit}>
            <TextField
                type="text"
                variant='outlined'
                color='secondary'
                label="Vehicle Registration Number"
                onChange={e => setregNo(e.target.value)}
                value={regNo}
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
                onChange={e => setname(e.target.value)}
                value={name}
                fullWidth
                required
                sx={{mb: 4}}
            />
            <TextField
                type="number"
                variant='outlined'
                color='secondary'
                label="Phone Number"
                onChange={e => setphNo(e.target.value)}
                value={phNo}
                fullWidth
                required
                sx={{mb: 4}}
            />
            <TextField
                type="email"
                variant='outlined'
                color='secondary'
                label="Email"
                onChange={e => setemail(e.target.value)}
                value={email}
                fullWidth
                required
                sx={{mb: 4}}
            />
            </form>
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
                        onChange={e => setexpDate(e.target.value)}
                        value={expDate}
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
                        onChange={e => setentryT(e.target.value)}
                        value={entryT}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    <TextField
                        type="time"
                        variant='outlined'
                        color='secondary'
                        label="Expected exit time"
                        onChange={e => setexitT(e.target.value)}
                        value={exitT}
                        fullWidth
                        required
                        sx={{mb: 4}}
                    />
                    </div>
                 : ''}
            </FormGroup>
            <Button variant="outlined" color="secondary" type="submit">Submit</Button>
        </div>
    );
}