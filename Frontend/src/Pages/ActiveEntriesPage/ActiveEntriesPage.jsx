import React,{ useState, useEffect } from "react"
// import { run } from "./connect";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
//import { DataGrid } from '@mui/x-data-grid';
//import { useNavigate } from "react-router-dom"

export const ActiveEntries = (props) => {
    const navigate = useNavigate();
    const [inVehicles, setInVehicles] = useState([]);
    // const displayactiveentries = async(e) =>{
    //     e.preventDefault();
    //     let url;
    // }
    // const rows = [
    //     { vehiclenumber: 'ABC123', personname: 'John Doe', phonenumber: '555-555-5555', entrytime: '2023-04-13 09:00:00',  emailid: 'johndoe@example.com' },
    //     { vehiclenumber: 'DEF456', personname: 'Jane Smith', phonenumber: '555-555-5555', entrytime: '2023-04-13 10:00:00',  emailid: 'janesmith@example.com' },
    //     { vehiclenumber: 'GHI789', personname: 'Bob Johnson', phonenumber: '555-555-5555', entrytime: '2023-04-13 11:00:00',  emailid: 'bobjohnson@example.com' },
    //   ];
    const fetchData= async(e) => 
    {
        e.preventDefault();
        let url;
        url = `http://localhost:5001/api/info/in-vehicles`;
        try{
            const response = await axios.get(url);
            setInVehicles(response.data);
        } catch (err) {
            console.error('Error fetching in vehicles: ', err);
        }
    }
       
    const handleAdd = async (e) => {
        e.preventDefault();
        navigate('/Add');
    }
    const handleLatestEntry = async(e) =>{
        e.preventDefault();
        navigate('/Home');
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        navigate('/Search');
    }
    fetchData();
    return (
        <div>
            <h2>Active Entries Page</h2>
                <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 0.8 }}>
                Active Entries
            </Typography>
            <Button color="inherit" onClick={handleLatestEntry}>Latest Entry</Button>
            <Button color="inherit" onClick={handleSearch}>Search</Button>
            <Button color="inherit" onClick={handleAdd}>Add Entry</Button>
            </Toolbar>
        </AppBar>
        <Button variant="contained" onClick={fetchData}>Fetch In Vehicles</Button>
        <TableContainer component={Paper} sx={{overflow:"scroll",height:"500px"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Person Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Entry Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inVehicles.map((vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell>{vehicle.vehicleNumber}</TableCell>
                <TableCell>{vehicle.personName}</TableCell>
                <TableCell>{vehicle.phoneNumber}</TableCell>
                <TableCell>{vehicle.emailId}</TableCell>
                <TableCell>{vehicle.entryTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Box>
        </div>
    )
}
