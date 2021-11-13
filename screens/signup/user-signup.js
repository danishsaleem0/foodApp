import  React, { useState } from 'react';
import { createUserWithEmailAndPassword, auth , db, doc, setDoc } from '../../config/firebase';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as Link2 } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const theme = createTheme();

function SignUpWithUser() {
  let history = useHistory();
  const [ erro, setError] = useState('');

  const saveUser = async() => {
 //   console.log( user )
    try{
      let { user } = await createUserWithEmailAndPassword(auth, email, password)
      let docRef = doc(db, 'user-information', user.uid )
      await setDoc(docRef, {
        userName: userName,
       phoneNumber: phoneNo,
       cityName: cityName,
       countryName: countryName,
       email: email,
       password: password,
       userRole: 'user',
       UID: user.uid
      })
 
     history.push('/user-home');
    } catch(error) {
     alert(error.message)
    }
        
  
  }
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [countryName, setCountryName] = useState('');
  const [cityName, setCityName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
         <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up with User
          </Typography>

          <Box component="form" noValidate  sx={{ mt: 3 }}>

              <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e)=> {setUserName(e.target.value)}}
                  value={userName}
                  autoComplete="given-name"
                  name="User-Name"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e)=> {setPhoneNo(e.target.value)}}
                  value={phoneNo}
                  required
                  fullWidth
                  id="phoneNo"
                  label="Phone No"
                  name="PhoneNo."
                  autoComplete="phone-no"
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  onChange={(e)=> {setCountryName(e.target.value)}}
                  value={countryName}
                  required
                  fullWidth
                  id="country"
                  label="Country Name"
                  name="Country Name"
                  autoComplete="Country Name"
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  onChange={(e)=> {setCityName(e.target.value)}}
                  value={cityName}
                  required
                  fullWidth
                  id="city"
                  label="City Name"
                  name="City Name"
                  autoComplete="City Name"
                />
              </Grid>



              <Grid item xs={12}>
                <TextField
                  onChange={(e)=> {setEmail(e.target.value)}}
                  value={email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={(e)=> {setPassword(e.target.value)}}
                  value={password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              </Grid>

            <Button
              onClick={saveUser}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            > Sign Up </Button>


           <Grid container justifyContent="flex-start">
                <Grid item>
                    <Link2 to="/signup-with-restuarant" style={{textDecoration: '', color: 'black', fontSize: '12px',}} >
                     Signup with Restuarant        
                  </Link2> 
            </Grid>
            </Grid>


            <Grid container justifyContent="flex-end">
                <Grid item>

                <Link2 to="/login" style={{fontSize: '15px', fontWeight: 'normal', fontFamily: 'sans-serif'}}  >
    
                  Already have an account? Sign in
                </Link2>
            </Grid>
            </Grid>
            </Box>
            </Box>
      </Container>
      </ThemeProvider>
      
  );
}
export default SignUpWithUser;