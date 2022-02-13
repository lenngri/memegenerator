import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../assets/BurritoLogo.png';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Auth0Client } from '@auth0/auth0-spa-js';

const pages = ['Editor', 'Overview', 'Logout'];

const NavBar = () => {
  const auth0Client = useStoreState((state) => state.auth0Client);
  const setAuth0Client = useStoreActions((actions) => actions.setAuth0Client);
  const setAuthOrigin = useStoreActions((actions) => actions.setAuthOrigin);
  const setLoggedIn = useStoreActions((actions) => actions.setLoggedIn);
  const setToken = useStoreActions((actions) => actions.setToken);
  const setUser = useStoreActions((actions) => actions.setUser);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    try {
      await auth0Client?.logout();
      setAuthOrigin(null);
      setToken(null);
      // setUser(null);
      setLoggedIn(false);
    } catch (error) {
      console.log(error)
    }
  }

  let navigate = useNavigate();

  // const handleLogout = () => {
  //   logout;
  //   navigate("/login");
  // }

  const auth0 = useAuth0()

  return (
    <AppBar position='static' style={{ background: '#000000' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Button>
            <img
              src={Logo}
              alt='new'
              style={{ height: 60, width: 70, paddingRight: 10.0 }}
              onClick={() => navigate('/editor')}
            />
          </Button>

          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={() => navigate('/editor')}
          >
            Burrito Memes
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Navigation
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key='Editor'
              onClick={() => navigate('/editor')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Editor
            </Button>

            <Button
              key='Overview'
              onClick={() => navigate('/overview')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Overview
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='P' src={'../assets/burrito.jpg'} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key='Profile' onClick={() => navigate('/profile')}>
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem>
              <MenuItem
                key='Logout'
                onClick={() => {
                  auth0.handleLogOut();
                }}
              >
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
