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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
    const handleEditEntry = async (e) => {
        e.preventDefault();
        navigate('/Edit');
    }

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
        url = `http://localhost:5001/api/info?vehicleNumber=${vehicleNumberSc}`;
        try {
            const response = await axios.get(url);
            setInVehicles(response.data);
        } catch (err) {
            console.error('Error fetching in vehicle\'s data: ', err);
        }
    }

    return (
        <div className="searchPage">
            <div class="navbar navbar-fixed-top">
                <div class="navbar-header">
                    <p class="navbar-brand" href="#">Search</p>
                </div>
                <div class="navbar-inner">
                    <ul class="nav">
                        <li class="active"><a href="#">Latest Entry</a></li>
                        <li><a href="#">Active Entires</a></li>
                        <li><a href="#">Add new Entry</a></li>
                    </ul>
                </div>
            </div>
            <form className="Search-form" onSubmit={handleSearch}>
                <label>/Vehicle Reg. No. :</label>
                <input value={vehicleNumberSc} onChange={(e) => setVehicleNumber(e.target.value)} type='search' id='vehicleNumberSc'></input>
                <button type="submit">Enter</button>
                <button className="link-btn" onClick={() => props.onFormSwitch('forgotpass')}>ForgotPassword</button>
            </form>
        </div>
    );
}

