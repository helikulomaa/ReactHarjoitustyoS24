import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link, Outlet } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';

function MenuMUI() {

  const [anchorMenu, setOpenNavi] = useState(null);

  const menuOpen = (e) => {
    setOpenNavi(e.currentTarget);
  }

  const menuClose = () => {
    setOpenNavi(null);
  }

  return (
    <Box>
      <AppBar position='static' style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton size='large' onClick={menuOpen}><MenuIcon /></IconButton>
          <Typography color='primary'>OPPIMISPÄIVÄKIRJA</Typography>
          <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)}
            onClose={menuClose}>
            <MenuItem component={Link} to="/" onClick={menuClose}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary='Koti' />
            </MenuItem>
            <MenuItem onClick={menuClose} component={Link} to="/lisaa">
              <ListItemIcon><CreateIcon /></ListItemIcon>
              <ListItemText primary='Lisää uusi kysymys' />
            </MenuItem>
            <MenuItem onClick={menuClose} component={Link} to="/listaa">
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary='Kaikki kysymykset' />
            </MenuItem>
            <MenuItem onClick={menuClose} component={Link} to="/hae">
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary='Hae kysymyksiä' />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export default MenuMUI;
