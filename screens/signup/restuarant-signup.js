import React, { useState, useContext  } from 'react';
import { GlobalContext } from '../../context/context'; 
import { createUserWithEmailAndPassword, auth , onAuthStateChanged, db, doc, setDoc, ref, uploadBytes,  getDownloadURL,storage } from '../../config/firebase';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as Link2 } from 'react-router-dom';
import { useHistory } from "react-router-dom";
const theme = createTheme();


function SignUpWithRestuarant() {

  function uploadImageToStorage() {
    return new Promise( async(resolve,reject) => {
     const imagesRef = ref(storage, `profile-picture/${file.name}`);
     await  uploadBytes(imagesRef, file)
     let url = await  getDownloadURL(imagesRef)
     resolve(url)
    })
 
}
     let history = useHistory();
     const { state } = useContext(GlobalContext )
     const [restuarantName, setRestuarantName] = useState('');
     const [cityName, setCityName] = useState('');
     const [countryName, setCountryName] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [ file, setFile ] = useState('');

     const saveRestuarant = async() => {


    
     try {
      let { user } = await createUserWithEmailAndPassword(auth, email, password)
      let UID = user.uid;
      let imageURL = await uploadImageToStorage(UID)
      let today = new Date();
      let time = today.getHours() + ":" + today.getMinutes() + ":"  + ' ' +  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() ;
      let docRef = doc(db, 'restuarent-information', user.uid )
         await setDoc(docRef, {

          restuarantName: restuarantName,
          time: time,
          cityName: cityName,
          countryName: countryName,
          email: email,
          password: password,
          userRole: 'restuarant',
          RestuaranProfile: imageURL,
          UID: UID
         })
         history.push('/restuarant-home');

    } catch(error) {
      alert(error.message)   
   }
 }

   
     const handleSubmit = (event) => {
     event.preventDefault();
     const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
     
  };

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
            Sign up with Restuarant
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

              <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => {setRestuarantName(e.target.value)} }
                  value={restuarantName}
                  required
                  fullWidth
                  id="restuarantName"
                  label="Restuarant Name"
                  name="Restuarant "
                  autoComplete="restuarant-name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={(e) => {setCityName(e.target.value)} }
                  value={cityName}
               required
               fullWidth
               id="city"
               label="City Name"
               name="City Name"
               autoComplete="city Name"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {setCountryName(e.target.value)} }
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
                  onChange={(e) => {setEmail(e.target.value)} }
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
                  onChange={(e) => {setPassword(e.target.value)} }
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

             <label htmlFor='upload-picture' >
               <TextField
               style={{ display: 'none' }}     
               id='upload-picture'
               name='upload-picture'
               type='file'
               variant="standard"
               onChange={(e)=>{ setFile(e.target.files[0])}}
                      >
            </TextField>
              <Button style={{position: 'relative', top: ' 14px'}} size='small' color="info" variant="contained" component="span">
              <Icon color="default" style={{ marginRight: '6px', marginBottom: '3px' }} > add_circle </Icon> 
              Upload Profile
            </Button>
            </label>

            <Button
              onClick={saveRestuarant}
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            > Sign Up </Button>

                        
             <Grid container justifyContent="flex-start">
                <Grid item>
                    <Link2 to="/signup" style={{textDecoration: '', color: 'black', fontSize: '12px',}} >
                     Signup with User       
                  </Link2> 
            </Grid>
            </Grid>

            <Grid container justifyContent="flex-end">
                <Grid item>
                 <Link2 to='/login'style={{fontSize: '15px', fontWeight: 'normal', fontFamily: 'sans-serif'}} >
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
export default SignUpWithRestuarant;