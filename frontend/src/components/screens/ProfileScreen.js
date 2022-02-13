import { useStoreActions } from 'easy-peasy';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import NavBar from '../NavBar';
import MemeHistory from '../MemeHistory';
import { useStoreState } from 'easy-peasy';
import { Auth0Client } from '@auth0/auth0-spa-js';

const theme = createTheme();

export default function ProfileScreen() {
  const auth0Client = useStoreState((state) => state.auth0Client);
  const setLoggedIn = useStoreActions((actions) => actions.setLoggedIn);
  const user = useStoreState((state) => state.userSession.user);
  const setAuth0Client = useStoreActions((actions) => actions.setAuth0Client);
  const setToken = useStoreActions((actions) => actions.setToken);
  const setUser = useStoreActions((actions) => actions.setUser);

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
    handleLogOut,
  }};

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleLogOut = async () => {
    try {
      await auth0Client?.logout();
      console.log("auth0 logout")
      setToken(null);
      console.log("token")
      setUser(null);
      console.log("user")
      setLoggedIn(false);
      console.log("log out")
    } catch (error) {
      console.log(error)
    }
  }

  const auth0 = useAuth0()

  return (
    <div>
      <NavBar />

      <ThemeProvider theme={theme}>
        <Container component='main'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paper elevation={4}>
              <Box
                sx={{
                  paddingTop: 2.0,
                  paddingBotton: 2.0,
                  paddingLeft: 5.0,
                  paddingRight: 5.0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 1.0,
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: 'secondary.main',
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Account Details
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <Typography component='h6' variant='h6'>
                    Username
                  </Typography>
                  <Typography component='h6' variant='subtitle1' style={{ paddingBottom: 20.0 }}>
                    {user.username}
                  </Typography>

                  <Typography component='h6' variant='h6'>
                    Email address
                  </Typography>
                  <Typography component='h6' variant='subtitle1'>
                    {user.email}
                  </Typography>

                  {/* <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Edit
                  </Button> */}
                  <Button
                    onClick={() => {
                      auth0.handleLogOut();
                    }}
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ color: 'red', backgroundColor: 'white', msHyphenateLimitLines: 2, my: 2 }}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
          <MemeHistory />
        </Container>
      </ThemeProvider>
    </div>
  );
}
