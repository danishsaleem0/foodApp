import React, {useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import ResHome from '../screens/restuarant-dashboard/restuarant-home';
import UserHome from '../screens/user-dashboard/user-home';
import RestuarantDetailsPage from '../screens/user-dashboard/restuarant-page-details';
import Login from '../screens/login/login';
import SignUpWithUser from '../screens/signup/user-signup';
import SignUpWithRestuarant from '../screens/signup/restuarant-signup';
import { getDoc, doc,db, onAuthStateChanged, auth } from './firebase';
import { GlobalContext } from '../context/context';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

  
  const variants = ['h1', 'h3', 'body1', 'caption'];

  function Routes() {
    
    const { state, dispatch } = useContext(GlobalContext)
    
    useEffect(()=> {
      onAuthStateChanged(auth, (user) => {
        if (user) {
       fatchUserunformation(user.uid);
       dispatch({ type: 'USER_CHECK' })
          
        } else {
          console.log('user does not exits' ) 
          dispatch({ type: 'USER_NOT_EXIST' })
         }
      });
    }, [])

   async function fatchUserunformation(uid) {

   let userRef = doc(db, 'user-information', uid ) ; 
   let userDoc = await getDoc(userRef);

   let resRef = doc(db, 'restuarent-information', uid ) ; 
   let resDoc = await getDoc(resRef );
   
  

   if (userDoc.exists()) {
     let userInformation = userDoc.data()
    console.log("user-infromation found");
    dispatch( { type: 'AUTH_USER',  payload: userInformation } )

  }
   else if(resDoc.exists() )   {
    let resInformation = resDoc.data()
    console.log("restuarant-data found"  );
    dispatch( { type: 'AUTH_USER', payload: resInformation } )
  } 
  
  else { 
    console.log("No such document!");
  }
    }

  
  return(

    <Router>

        <Navbar />
        <Switch>

     { 
      state.authUser?.userRole === 'restuarant' ?
       <Route path='/restuarant-home' >
        <ResHome />
       </Route>


       : 
       null 
   } 

{
  
  state.authUser?.userRole === 'user' ?
  <>
  <Route path='/user-home' >
  <UserHome />
  </Route>

  <Route path='/restuarant-details-page' > 
    <RestuarantDetailsPage />
  </Route>  
  </> 

 :
//  <Container maxWidth="lg" style={{alignItem : 'center' , backgroundColor: '' }} >
//    <Box sx={{ bgcolor: '' ,textDecoration : 'underline', position: 'relative', top: '20px'}} > 

//    <Stack spacing={1} >
//       <Skeleton variant="text" style={{ padding : '5%' }}   />
//    </Stack>


//   <div style={{width: '70%', margin : '0 auto' }} >

//    <Stack  style={{ flexDirection: 'row', display : 'flex', justifyContent: 'space-around'}} >
//      <Skeleton variant="rectangular" width={220} height={320} />
//      <Skeleton variant="rectangular" width={220} height={320} />
//      <Skeleton variant="rectangular" width={220} height={320} /> 
//    </Stack>
    
//    <Stack  style={{ flexDirection: 'row', display : 'flex', justifyContent: 'space-around', position : 'relative', top: '20px'}} >
//      <Skeleton variant="rectangular" width={220} height={320} />
//      <Skeleton variant="rectangular" width={220} height={320} /> 
//      <Skeleton variant="rectangular" width={220} height={320} /> 
//    </Stack>
//   </div>

//    </Box>
//   </Container>
null
}

   { 
   state.checkUser  === 'user does not exist'?
    <>
      <Route exact path='/' >
      <Login />
    </Route>

    <Route exact path='/signup' >
     <SignUpWithUser />
    </Route>


   <Route exact path='/signup-with-restuarant' >
     <SignUpWithRestuarant />
   </Route>


     </>
     : 
     null

    }

   </Switch>
   </Router>
)
  }
  export default Routes;