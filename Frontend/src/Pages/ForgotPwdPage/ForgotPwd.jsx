import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from "axios";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export const ForgotPassword = (props) =>{
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
    }

    const handleLogin = () =>{
        navigate('/');
    }

    return(
        // <div className="auth-form">
        //     <form className="forgotpass-form" onSubmit={handleSubmit}>
        //         <label>Email</label>
        //         <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="security3096@iith.ac.in" id='email'></input>
        //         <button type='button'>Enter</button>
        //         <button className="link-btn" onClick={handleLogin}>Login</button>
        //     </form>
        // </div>
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh',position : "absolute" }}>
            <CssBaseline />
             {/* <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    // height : '500px',
                    // backgroundImage: "/home/rocky/Downloads/Software-Engineering/Frontend/src/Pages/LoginPage/Profile_photo.jpg",
                    backgroundImage : 'url(https://resch.iith.ac.in/assets/images/1.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />  */}
            <Grid item xs={12} component={Paper} elevation={6} square backgroundColor={"#eae9e9"}>
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main', 
                position: 'absolute',
                left: '77.5%',
                top: '16%'}}>
                <LockOutlinedIcon />
            </Avatar>  */}
            <Box
                sx={{
                my: 8,
                mx: 4,
                // display: 'flex',
                // flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute',
                top: '17%',
                left: '30%'
                }}
            >
                <Typography component="h1" variant="h4">
                <span style={{fontWeight: 'bold'}}>Forgot Password</span>
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="User Name"
                    id="username"
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)} 
                    placeholder="Rockey156"
                    // autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    // autoComplete="email"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="security3096@iith.ac.in"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                <span style={{fontWeight: 'bold'}}>Enter</span>
                </Button>
                <Grid container>
                    <Grid item xs>
                        <span onClick={handleLogin} className="link-btn" style={{fontWeight: 'bold',cursor:"pointer"}}>Login</span>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Grid>
        </Grid> 
        </ThemeProvider>
    );
}