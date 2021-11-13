import React, { useContext, useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
import { db,  collection, getDocs } from '../../config/firebase';
import { GlobalContext } from '../../context/context';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function UserHome() {
    let history = useHistory();
    const { dispatch} = useContext(GlobalContext);
    const [restuarantData, setRestuarantData  ] = useState([]);
    

    let restuarantDataClone = restuarantData.slice(0)
    useEffect( async() => {

    let foodMenuRef = collection(db, 'restuarent-information')
    let allRestuarantData = await getDocs(foodMenuRef);
    allRestuarantData.forEach((doc) => {
    restuarantDataClone.push(doc.data())

        });
   setRestuarantData(restuarantDataClone)
    console.log(restuarantData)
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   


   

    return (
      
      <div>
      <CssBaseline />
        <Container maxWidth="lg" style={{alignItem : 'center' , backgroundColor: '' }} >
        <Box sx={{ bgcolor: '' ,textDecoration : 'underline', position: 'relative', top: '20px'}} > 

        <div style={{textAlign: 'center' , color: '',padding: '20px 0px 20px 0px' }}>
         <Typography  variant="h2" component="h2">
           Eat, Sleep & Repeat
        </Typography>
        </div>

       <div style={{ width: '80%', margin: '0 auto'}} >
       {
         
         restuarantData.map(({countryName,cityName, time, RestuaranProfile, email, UID, restuarantName } ,index ) => (
            
         
          <Card sx={{ maxWidth: 345, marginBottom: '25px',marginLeft: '15px', float: 'left'}} key={index}   >
          <CardHeader
          avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            a
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {cityName+ ' ' + countryName }
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={ RestuaranProfile}
        alt="Restuaratn Name"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
           {restuarantName.toUpperCase() }
        </Typography>
      </CardContent>
      

      <CardActions disableSpacing  >

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
     <Button onClick={ async () => { 
      let current = { UID, restuarantName   , countryName,cityName }
      
      dispatch( { type: 'CURRENT_SELECTED',  payload: current  })
      history.push('/restuarant-details-page') 
             } }   style={{ position: 'relative ' , left: '35px' }}  variant="outlined" color='secondary' size='small' startIcon={<FoodBankIcon />  }>
       See Dishes
     </Button>
     </CardActions> 

    </Card>



))
}

    </div>
        </Box> 
      </Container>
        <div style={{backgroundColor: '#5D6D7E',  width: '100%' , height: '190px', position: 'relative', top: '100px', display: 'flex', justifyContent: 'space-around'}}  >

< div  style={{width:'20%' }}  >
  <h2 >Company Name</h2>
  <p style={{ color: 'white', fontSize: '13px'}} >Foodyn the brand that values honesty which brings reliability,that offers the quality products made from particular raw
   material with a lot of time and effort spent and that provides the culture to enjoy eating occasions.</p>
  </div>

<div style={{width:'20%'}} >
    <h2> Links </h2>
    <p> <a style={{ color: 'white'}}  href='#' > Your Account</a> </p>
  <p> <a style={{ color: 'white'}}  href='#' > Registration Charges</a> </p>
  <p> <a style={{color: 'white'}}  href='#' > Help</a> </p>
</div>  

<div style={{width:'30%' }}  >
    
  <h2 >Contact</h2>
  <p> <a style={{textDecoration: 'none', color: 'white'}}  href='#' > 48th Street, Badar Commercial</a> </p>
  <p> <a style={{textDecoration: 'none', color: 'white'}}  href='#' > Phone No. 03212216415</a> </p>
  <p> <a style={{textDecoration: 'none', color: 'white'}}  href='#' > Mail: danishsaleem909@gmail.com</a> </p>
    </div>

</div>

</div>   
    )
}
export default UserHome