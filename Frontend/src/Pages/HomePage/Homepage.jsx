import React, {useState} from "react"
import AppBar from '@mui/material/AppBar';
import {Box, Grid} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import {Typography, TextField, FormControlLabel, Checkbox, CardMedia} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";


export const Homepage = (props) =>{

    // constructor(props){
    //     super(props);
    //     this.state = 
    // }

    // function createData(name, username, email, phone, website) {
    //     return { name, username, email, phone, website };
    // }

    // const rows = [];

    const [valid,setvalid] = useState('');

    const navigate = useNavigate();
    
    const handleAdd = async(e) =>{
        e.preventDefault();
        navigate('/Add');
    }
    const handleActive = async (e) => {
        e.preventDefault();
        navigate('/ActiveEntries');
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        navigate('/Search');
    }

    // const bull = (
    //     <Box
    //       component="span"
    //       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    //     >
    //       •
    //     </Box>
    //   );

    return(
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h4" component="div" sx={{ flexGrow: 0.8 }}>
                    Latest Entry
                </Typography>
                <Button color="inherit" onClick={handleActive}>Active Entries</Button>
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
                        defaultValue="TS 09 AB 1234"
                        InputProps={{
                            readOnly: true,
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
                        defaultValue="I. Rajasekhar"
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
                    <Typography gutterBottom variant="h4" component="div" align="right" ml = {10} mr = {8} >
                        Mobile No.      :
                    </Typography>
                    <TextField 
                        margin-left = "dense"
                        id="phoneNo"
                        backgroundColor = "red"
                        defaultValue="9618084648"
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
                        defaultValue="cs20btech11020@iith.ac.in"
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
                        defaultValue="15:24"
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
                        defaultValue="N/A"
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
}
