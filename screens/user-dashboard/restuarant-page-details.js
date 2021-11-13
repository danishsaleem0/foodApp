import React, { useContext, useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from "@mui/material";
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
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Button from '@mui/material/Button';
import { collection, query, where, getDocs, db } from '../../config/firebase';


function RestuarantDetailsPage() {

   const { state, dispatch } = useContext(GlobalContext);
   const [ menuData, setMenuData ] = useState([]);
   


   let menuDataClone = menuData.slice(0);
   
   useEffect(  async()=> {
    let menuRef = collection(db, 'food-item-menu')
    let q = query(menuRef, where('UID' ,'==' ,state.currentSelected.UID ))

    const allMenuGet = await getDocs(q);
    allMenuGet.forEach((doc) => {
    menuDataClone.push( doc.data())
    //dispatch({ type: 'SAME_PAGES_DISHES', payload: doc.data() }) 
    });
   setMenuData(menuDataClone);
   
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
    

    return (  

        <>
        <CssBaseline />
        <Container maxWidth="lg" style={{alignItem : 'center' , backgroundColor: '' }} >
        <Box sx={{ bgcolor: '' ,textDecoration : 'underline', position: 'relative', top: '20px'}} > 
          
        <div style={{textAlign: 'center' , color: '',padding: '30px 0px 30px 0px' }}>
           <Typography  variant="h2" component="h2"> {state.currentSelected.restuarantName.toUpperCase() }</Typography>
        </div>

  
        <div style={{ width: '80%', margin: '0 auto'}} >
       {
        menuData.map (( { UID, deliveryType, dishItem, dishPicture, dishPrice, foodCategory, restuarantName, time }, index ) => (
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
        title= {dishItem}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={dishPicture}
        alt="dish picture"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {dishPrice}
        </Typography>
        <Typography variant="body2" color="text.secondary" >
         Delivery  {deliveryType}
        </Typography>
       
      </CardContent>
 
      <CardActions disableSpacing  >

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
     <Button  style={{ position: 'relative ' , left: '35px' }}  variant="outlined" color='secondary' size='small' startIcon={<FoodBankIcon />  }>
       Add To Cart
     </Button>
     </CardActions> 

    </Card>
        
        ))

}
        </div>
         </Box>
        </Container>
      </>

    )

}
export default RestuarantDetailsPage;