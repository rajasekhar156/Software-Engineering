import React from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export const Homepage = (props) =>{

    // constructor(props){
    //     super(props);
    //     this.state = 
    // }

    const username = "Rajasekhar"

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );

    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 0.8 }}>
                Latest Entry
            </Typography>
            <Button color="inherit" >Active Entries</Button>
            <Button color="inherit" >Add Entry</Button>
            <Button color="inherit" >Search Entry</Button>
            </Toolbar>
        </AppBar>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    Name : {username}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                Mobile No : 
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                Correspondent <br /> IITH E-mail : 
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                Entry Time : 
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                Exit Time  : 
                </Typography>
                {/* <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
                </Typography>
                <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography> */}
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
        </Box>
    );
}
