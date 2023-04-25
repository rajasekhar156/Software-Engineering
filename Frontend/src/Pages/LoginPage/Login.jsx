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
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

  
const theme = createTheme();

let temp = false;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export const Login = (props) =>{
    const [userId,setuserId] = useState('');
    const [password,setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    const [gateNo, setGateNo] = useState(0);

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // const info={userId:userId,password:password};
	    // setDataInput([info]);
        // run();
        let url;
        url = `http://localhost:5001/api?userid=${userId}&userpwd=${password}&gateno=${gateNo}`;
        
        const tp = await axios.post(url);
        console.log(tp.status);
        if(tp.data === "1"){
            setOpen(true);
            temp = true;
            navigate('/Home');
        }
        else if(tp.data === "0"){
            // setClose(true);
            alert("OOPS! Invalid Login Details");
        }
    }

    const handleforgotpwd = () => {
        navigate('/Forgotpwd');
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setClose(false);
      };

    return(
        // <div className="auth-form">
        //     <h2>Login</h2>
        //     <form className="login-form" onSubmit={handleSubmit}>
        //         <label>User Id</label>
        //         <input value={userId} onChange={(e)=>setuserId(e.target.value)} type='text' placeholder="security3096@iith.ac.in" id='userId'></input>
        //         <label>Password</label>
        //         <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder="********" id='password'></input>
        //         <button type="submit">Enter</button>
        //         <button className="link-btn" onClick={handleforgotpwd}>ForgotPassword</button>
        //     </form>
        // </div>


        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
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
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square backgroundColor={"#eae9e9"}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', 
                    position: 'absolute',
                    left: '77.5%',
                    top: '16%'}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    // display: 'flex',
                    // flexDirection: 'column',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '17%'
                    }}
                >
                    <Typography component="h1" variant="h4">
                    <span style={{fontWeight: 'bold'}}>Sign in</span>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={userId} 
                        onChange={(e)=>setuserId(e.target.value)}
                        placeholder="security3096@iith.ac.in"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        placeholder="********"
                        autoComplete="current-password"
                    />
                    <FormControl style={{ marginTop: 15, marginLeft: 15 }}>
                        
                        <Select value={gateNo} onChange={(e) => setGateNo(e.target.value)}>
                            <MenuItem value={1}>In</MenuItem>
                            <MenuItem value={2}>Out</MenuItem>
                        </Select>
                        <FormHelperText>Select the Gate</FormHelperText>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    <span style={{fontWeight: 'bold'}}>Sign In</span>
                    </Button>
                    <Snackbar open={close} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        OOPS! Invalid Login Details
                        </Alert>
                    </Snackbar>
                    <Grid container>
                        <Grid item xs>
                            <span onClick={handleforgotpwd} className="link-btn" style={{fontWeight: 'bold',cursor:"pointer"}}>Forgot password...Again?</span>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export {temp};