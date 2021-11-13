import React, { useContext } from 'react';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { GlobalContext } from '../context/context';
import { auth, signOut } from '../config/firebase';


function Navbar() {
   let history = useHistory();
   const { state } = useContext(GlobalContext);
   
   
   const  logOut = async() => {
   await signOut(auth)
   history.push('/')
   }

 let currentUser = state.checkUser;
 
 if(currentUser[0] === 'user exist' ) {
  <Button color="success" variant='outlined' size='small' style={{marginRight: '12px'}} onClick={logOut} >
  Log out </Button>
 }

 else if( currentUser[0] === 'user does not exist') {
   <>
  <Button color="success" variant='outlined' size='small' onClick={ ()=> { history.push('/') } } style={{marginRight: '12px'}} >
  Login </Button>
  
  <Button color="success" variant='outlined' size='small'onClick={ ()=> { history.push('/signup') } }  >
  Signup 
 </Button>

  </>
 }
return(
  <div>

<Box sx={{ flexGrow: 1 }}  >        
     <AppBar position="static" color='transparent' >
      <Toolbar>
      
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }} >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Foodyn
      <FoodBankIcon color='secondary' fontSize='medium'  sx={{position: 'relative', top: '4px', left: '3px'}} />
      </Typography>
         
      {



       state.authUser?.userRole === 'user' ?

       <ButtonGroup variant="contained" aria-label="outlined primary button group"  size='small' >
          <Button> <Link to='/user-home'  style={{textDecoration: 'none' , color: 'white'}} >All-dishes  </Link> </Button> 
         <Button onClick={logOut} >logout</Button>
       </ButtonGroup>
     : 
     state.authUser?.userRole === 'restuarant' ? 
       <ButtonGroup variant="contained" aria-label="outlined primary button group" size='small' >
          <Button> <Link to='/restuarant-home' style={{textDecoration: 'none' , color: 'white'}} >  add-dishes </Link> </Button>  
           <Button><Link to='' style={{textDecoration: 'none' , color: 'white'}} > dash-board  </Link> </Button>  
       <Button onClick={logOut} >logout</Button>
      </ButtonGroup> 
     : null
    //  <>
 

}



{
  state.checkUser === 'user does not exist' ?
 <>
  <Link to='/' style={{textDecoration: 'none'}} >
  <Button color="success" variant='outlined' size='small' style={{marginRight: '12px'}} >
   Login </Button>
    </Link>

   <Link to='/signup'  style={{textDecoration: 'none'}}>
   <Button color="success" variant='outlined' size='small' >
    Signup 
   </Button>
  </Link> 
  </> 
  :
  null
}          


    </Toolbar>
    </AppBar>
    </Box>

    </div>



        
  );
}



export default Navbar;