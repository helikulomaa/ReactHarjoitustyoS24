import { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import { Tabs, Tab } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Edit } from '@mui/icons-material';

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
          <Typography variant='h5' sx={{ color: 'black', flexGrow: 1 }}>OPPIMISPÄIVÄKIRJA</Typography>
          <Tabs sx={{ marginLeft: 'auto' }}>
            <Tab component={Link} to="/" label='Kirjoita' icon={<EditIcon />} />
            <Tab component={Link} to="/listaa" label='Kaikki kysymykset' icon={<ListIcon />} />
            <Tab component={Link} to="/lisaa" label='Lisää uusi kysymys' icon={<AddIcon />} />
            <Tab component={Link} to="/hae" label='Hae kysymyksiä' icon={<SearchIcon />} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export default MenuMUI;
