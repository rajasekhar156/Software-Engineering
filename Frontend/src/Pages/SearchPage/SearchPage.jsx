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

    const navigate = useNavigate();

    const handleLatestEntry = async (e) => {
        e.preventDefault();
        navigate('/LatestEntry');
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

    const handleSearch = async (e) => {
        e.preventDefault();
        // const info={email:email,password:password};
        // setDataInput([info]);
        // run();
        searchVehicle();
    }

    const searchVehicle = async (vehicleNumberSc) => {
        let url;
        url = `http://localhost:5001/api/info?vehicleNumber=${vehicleNumberSc}`;
        const res = await axios.get(url);
        //setStudents(res.data);
    };

    return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="top" positionMode="fixed">
            <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 0.8 }}>
                Search
            </Typography>
                        <Button color="inherit" onClick={handleActive}>Active Entries</Button>
                        <Button color="inherit" onClick={handleLatestEntry}>Latest Entry</Button>
                        <Button color="inherit" onClick={handleAddEntry}>Add Entry</Button>
            </Toolbar>
        </AppBar>
        </Box>

        <form className="Search-form" onSubmit={handleSearch}>
                <Toolbar>
                <SearchIt>
                        <Typography display="inline" variant="h5" component="div" sx={{ flexGrow: 0.8 }}>
                        Vehicle Reg. No. :
                    </Typography>
                    <StyledInputBase 
                        value={vehicleNumberSc} onChange={(e) => setVehicleNumber(e.target.value)}
                        type='search' id='vehicleNumberSc'
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        
                    />
                    <Button type="submit">
                        <IconButton>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                        </IconButton>
                    </Button>

                        <Button color="inherit" onClick={handleEditEntry}>Edit Details</Button>
                </SearchIt>
                </Toolbar>
        </form>

        </div>
    );
}