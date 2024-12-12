import React, { useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { authActions } from '../store/authSlice';

export default function Menu() {
  const [open, setOpen] = React.useState(false);
  const userData = useSelector((state: RootState) => state.authenticator);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = userData.isAutenticated;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/GestionPrestamos" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon />
              </ListItemIcon>
              <ListItemText primary="Gestion Préstamos" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/reports" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon />
              </ListItemIcon>
              <ListItemText primary="Informes" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/help" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Ayuda" />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
          <IconButton sx={{ color: 'white', flexGrow: 1 }}>
            {userData.userName || 'Usuario'}
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}