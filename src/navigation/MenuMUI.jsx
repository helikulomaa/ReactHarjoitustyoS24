import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Tabs, Tab } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import NotesIcon from '@mui/icons-material/Notes';

function MenuMUI() {
  const [value, setValue] = useState(0); // Aktiivinen välilehti

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h5' sx={{ color: 'black', flexGrow: 1 }}>OPPIMISPÄIVÄKIRJA</Typography>
          <Tabs
            value={value}
            onChange={handleTabChange}
            sx={{
              marginLeft: 'auto',
              '& .MuiTab-root': { color: 'gray' },
              '& .Mui-selected': { color: 'black' },
              '& .MuiTabs-indicator': { backgroundColor: 'gray' },
            }}
          >
            <Tab component={Link} to="/" label='Kirjoita' icon={<EditIcon />} />
            <Tab component={Link} to="/listaa" label='Kaikki kysymykset' icon={<ListIcon />} />
            <Tab component={Link} to="/lisaa" label='Lisää uusi kysymys' icon={<AddIcon />} />
            <Tab component={Link} to="/hae" label='Hae kysymyksiä' icon={<SearchIcon />} />
            <Tab component={Link} to="/oppimispaivakirja" label='Oppimispäiväkirjani' icon={<NotesIcon />} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

export default MenuMUI;
