import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const ActiveEntries = () => {
  const navigate = useNavigate();
  const [inVehicles, setInVehicles] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    async function fetchData() {
      let url;
      url = `http://localhost:5001/api/in-vehicles`;
      try {
        const response = await axios.get(url);
        setInVehicles(response.data);
      } catch (err) {
        console.error("Error fetching in vehicles: ", err);
      }
    }
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    navigate("/Add");
  };
  const handleLatestEntry = async (e) => {
    e.preventDefault();
    navigate("/Home");
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    navigate("/Search");
  };
  return (
    <div>

          <Box position={"absolute"} top={"0%"} left={"0%"} width={1847} >
            <AppBar position="static">
                <Toolbar >
                <Box position={"absolute"} left={"20%"} width={700}>
                <Button color="inherit" onClick={handleLatestEntry} sx={{fontWeight : '800', fontSize: '15px'}}>Latest Entry</Button>
                <Button color="inherit" onClick = {handleAdd} sx={{fontWeight : '800', fontSize: '15px'}} >Add Entry</Button>
                <Button color="inherit" sx={{fontWeight : '1000', fontSize: '18px'}}>Active Entries</Button>
                <Button color="inherit" onClick={handleSearch} sx={{fontWeight : '800', fontSize: '15px'}}>Search Entry</Button>
                </Box>
                <Button color="inherit" sx={{fontWeight : '400', fontSize: '12px', position: 'absolute', left: '79%'}}>logout</Button>
            </Toolbar>
            </AppBar>
            </Box>
      <Box position={"absolute"} top={"10%"} left={"0%"} width={1847} >
        {/* <Button variant="text" onClick={fetchData}>Fetch In Vehicles</Button> */}
        <TableContainer
          component={Paper}
          sx={{ overflow: "scroll", height: "500px" }}
        >
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
  );
};
