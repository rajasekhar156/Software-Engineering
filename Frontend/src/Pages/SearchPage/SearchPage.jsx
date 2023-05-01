import React, { useState } from "react"
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardMedia } from '@mui/material';
import Link from '@mui/material/Link';
import logo from '../../logo.png';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//import { isLoggedIn, setLoggedIn } from "../global";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SearchIt = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    

    },
}));


export const Search = (props) => {
    const [vehicleNumberSc, setVehicleNumber] = useState('');
    const [Vehicle_details, setVehicledetails] = useState([]);
    const navigate = useNavigate();

    const handleLatestEntry = async (e) => {
        e.preventDefault();
        navigate('/Home');
    }
    const handleActive = async (e) => {
        e.preventDefault();
        navigate('/ActiveEntries');
    }
    const handleAddEntry = async (e) => {
        e.preventDefault();
        navigate('/Add');
    }
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

    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     // const info={email:email,password:password};
    //     // setDataInput([info]);
    //     // run();
    //     searchVehicle();
    // }

    const fetchData = async (e) => {
        e.preventDefault();
        let url;
        url = `http://localhost:5001/api/vehicleNumber?vehicleNumber=${vehicleNumberSc}`;
        try {
            const response = await axios.get(url);
            console.log("11",response.data);
            if(response.data =='1'){
                setVehicledetails([{vehicleNumber:"NA",personName:"NA",phoneNumber:"NA",emailId:"NA",entryTime:"NA"}]);
                console.log("2",Vehicle_details);
                alert("OOPS! No entry Found");
                navigate('/Search')
            }
            else{
                console.log("raja");
                console.log(response.data);
                setVehicledetails(response.data);
             }
        } catch (err) {
            console.error('Error fetching vehicle detials\'s: ', err);
        }
    }

    const handleURLChange = () => {
        console.log('Yes, u are here');
        navigate('/');
    };

    if (localStorage.getItem("isLoggedIn") == "true") {
    return (
        <div>
            <div width = "100%" height = "100%">
                <Card sx={{ Width: '100%', height: '100%'}}>
                    <CardMedia
                        style={{ height: 960, width: 1840, opacity: 0.5 }}
                        image={require('../gate.jpg')} // require image
                        title="invalid entry"
                    />
                </Card>
            </div>
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
                    <Box position={"absolute"} left={"20%"}
                                sx={{
                                    width: 700
                                }}>
                                <Button color="inherit" onClick={handleLatestEntry} sx={{ fontWeight: '800', fontSize: '15px' }} >Latest Entry</Button>
                                <Button color="inherit" onClick={handleAddEntry} sx={{ fontWeight: '800', fontSize: '15px' }} >Add Entry</Button>
                                <Button color="inherit" onClick={handleActive} sx={{ fontWeight: '800', fontSize: '15px' }} >Active Entries</Button>
                                <Button color="inherit" sx={{
                                    fontWeight: '1000', fontSize: '15px'
                                }} variant="outlined">Search Entry</Button>
                    </Box>
                        <Button color="inherit" onClick={handleLogOut} sx={{ fontWeight: '400', fontSize: '12px', position: 'absolute', fontWeight: 'bold', right: '30px' }} >logout</Button>
                </Toolbar>
                </AppBar>
                </Box>   
            <Box position={"absolute"} top={"10%"} left={"0%"} width={"100%"} > 
            <form className="Search-form" onSubmit={fetchData}>
                <Toolbar>
                    <SearchIt>
                        <Typography display="inline" variant="h5" component="div" sx={{ flexGrow: 0.8,margin: 3 }}>
                            Vehicle Registration Number :
                        </Typography>
                        <StyledInputBase
                            value={vehicleNumberSc} onChange={(e) => setVehicleNumber(e.target.value)}
                            type='search' id='vehicleNumberSc'
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                                sx={{ border: 1, borderRadius: 2 }}

                        />
                        <Button type="submit">
                            <IconButton>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                            </IconButton>
                        </Button>

                        {/* <Button color="inherit" onClick={handleEditEntry}>Edit Details</Button> */}
                    </SearchIt>
                </Toolbar>
            </form>
            </Box> 
            
            <Box position={"absolute"} top={"20%"} left={"5%"} right={"5%"} width={"90%"} >
            <TableContainer component={Paper} sx={{ overflow: "scroll", height: "500px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vehicle Number</TableCell>
                            <TableCell>Person Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email ID</TableCell>
                            <TableCell>Entry Date</TableCell>
                            <TableCell>Entry Time</TableCell>
                            <TableCell>Exit Date</TableCell>
                            <TableCell>Exit Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Vehicle_details.map((vehicle) => (
                            <TableRow key={vehicle._id}>
                                <TableCell>{vehicle.vehicleNumber}</TableCell>
                                <TableCell>{vehicle.personName}</TableCell>
                                <TableCell>{vehicle.phoneNumber}</TableCell>
                                <TableCell>{vehicle.emailId}</TableCell>
                                <TableCell>{vehicle.entryDate}</TableCell>
                                <TableCell>{vehicle.entryTime}</TableCell>
                                <TableCell>{vehicle.exitDate}</TableCell>
                                <TableCell>{vehicle.exitTime}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
        </div>
    );}
    else {
        return (
            <div>
                {handleURLChange()}
            </div>
        );}
}

