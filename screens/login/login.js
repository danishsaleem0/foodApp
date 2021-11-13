import  React, {useState, useContext} from 'react';
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
import { Link as Link2 } from 'react-router-dom';
import {signInWithEmailAndPassword , auth,  onAuthStateChanged, collection, query, where,db, getDocs } from '../../config/firebase';
import { GlobalContext } from '../../context/context';
import { useHistory } from "react-router-dom";

const theme = createTheme();

function Login() {
  let history = useHistory();
  const { state, dispatch } = useContext(GlobalContext);
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  
 const signIn = async() => {

  try{
  
    let {user} = await signInWithEmailAndPassword(auth, email, password);
    
    const userRef = collection(db, "restuarent-information");
    const qu = query(userRef, where("UID", "==", user.uid));
    const querySnapshot = await getDocs(qu);
    querySnapshot.forEach((doc) => {
      let currentRef = doc.data()
     history.push('/restuarant-home')
  
  })
  
  const resRef = collection(db, "user-information");
  const q = query(resRef, where("UID", "==", user.uid));
  const querySnapsho = await getDocs(q);
  querySnapsho.forEach((doc) => {
    let currentUser = doc.data()
    history.push('/user-home')
  }) 
  
  } catch (error) {
    alert(error.message)
  }
} 


  return (

    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/user/phototastyfood',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />


        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign In
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}

              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword( e.target.value)}}

              />
              
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signIn}
              > Sign In </Button>

              <Grid container>
                <Grid item xs>
                 <Link href="#" variant="body2">  Forgot password? </Link>
                </Grid>

                <Grid item>
                  <Link2 to='/signup' >
                    Don't have an account? Sign Up
                  </Link2>
                </Grid>

            </Grid>
            </Box>
            </Box>
            </Grid>
            </Grid>
            </ThemeProvider>
  );
}
export default Login;