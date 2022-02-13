import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// Incase of remembering the user
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import backgroundLogo from '../../assets/backgroundlogo4.jpg';
import { useStoreActions, useStoreState } from 'easy-peasy';
import axios from 'axios';
import { Auth0Client } from '@auth0/auth0-spa-js';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://imgflip.com/i/3vmmo4'>
        Burrito Memes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginScreen() {
  const auth0Client = useStoreState((state) => state.auth0Client);
  const auth0Data = useStoreState((state) => state.userSession.auth0Data);
  const loggedIn = useStoreState((state) => state.loggedIn);
  const token = useStoreState((state) => state.userSession.token);
  const setUser = useStoreActions((actions) => actions.setUser);
  const setToken = useStoreActions((actions) => actions.setToken);
  const setLoggedIn = useStoreActions((actions) => actions.setLoggedIn);
  const setAuth0Client = useStoreActions((actions) => actions.setAuth0Client);
  const setAuth0Data = useStoreActions((actions) => actions.setAuth0Data);

  const configureAuth0Client = () => {
    console.log("configuring auth0Client")
    const auth0Config = {
      domain: 'dev-ttc1u0sj.us.auth0.com',
      client_id: '4J1oZzOgZnhQhNzmoFWjXmZezUcRhuZ5',
      audience: 'burrito-memes'
    };
    return new Auth0Client(auth0Config);
  };

  if(!auth0Client){
   setAuth0Client(configureAuth0Client());
  }

  function useAuth0(){
    console.log("using Auth0")
    return {
    auth0Login,
    auth0Logout,
    loggedIn,
    auth0Data,
    token
  }};

  async function auth0Login () {
    try {
      console.log("auth0 login running")
      // Have Auth0 popup a login window and Wait for Auth0 to do the OIDC work for us.
      await auth0Client?.loginWithPopup();
      // get Auth0 user data and store in state
      const userData = await auth0Client?.getUser();
      setAuth0Data(userData)
      const response = await axios.post(process.env.REACT_APP_BURL + '/api/user/external', auth0Data)
      console.log(response.data)
      // get token from Auth0 Service and store in state
      const auth0Token = await auth0Client?.getTokenSilently();
      setToken(auth0Token)
      // Update the state to represent that the user has logged in.
      setLoggedIn(true);
      console.log(token)
    } catch (e) {
      // If something goes wrong lets put it out to the console.
      console.error(e);
    }
  }

  function auth0Logout() {
    try {
      // Call the client to log the user out.
      auth0Client?.logout();
      // Update the state to represent the user is logged out.
      setLoggedIn(false);
      //setUserData("All Logged out");
      //setGravatar("");
    } catch (e) {
      // If something goes wrong put it out to the console.
      console.error(e);
    }
  }

  const auth0 = useAuth0()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // register the user via API
    axios
      .post(process.env.REACT_APP_BURL + '/api/user/login', {
        email: data.get('email'),
        password: data.get('password'),
      })
      .then(function (response) {
        if (response.data.success) {
          setToken(response.data.token);
          setUser(response.data.user);
          setLoggedIn(true);
          navigate('/editor');
        }
      })
      .catch(function (res, error) {
        alert('Email or password wrong.');
        console.log(res, error);
      });
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundLogo})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover  ',
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
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              {/* <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              /> */}
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Button onClick={() => auth0.auth0Login()}>Log in with Social</Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href='#' variant='body2' onClick={() => navigate('/forgotpassword')}>
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href='#' variant='body2' onClick={() => navigate('/register')}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
