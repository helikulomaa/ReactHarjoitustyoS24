import { AppBar, Box, ListItemIcon, Tab, Tabs, Toolbar, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search';
import Kysymyshaku from '../components/Kysymyshaku'
import Kysymyslista from '../components/Kysymyslista'
import Kysymyslomake from '../components/Kysymyslomake'
import RandomKysymys from '../components/RandomKysymys'

function TabMUI() {

    const [value, SetValue] = useState(0);

    const handleChange = (e, val) => {
        SetValue(val);
    }

    {/*Kysymykset ja kategoriat luotu ChatGPT:n avulla*/ }

    const kysymykset = [
        {
            id: 1,
            kysymys: 'Minkä niksin opin tänään harjoittelemastani ohjelmointikielestä tai työkalusta?',
            luontipaiva: '3.9.2024',
            kategoria: '1'
        },
        {
            id: 2,
            kysymys: 'Mitä opin tänään SCRUM-työskentelystä?',
            luontipaiva: '12.9.2024',
            kategoria: '2'
        },
        {
            id: 3,
            kysymys: 'Minkä ymmärtäminen tuntui vaikealta tänään?',
            luontipaiva: '24.9.2024',
            kategoria: '1',

        },
        {
            id: 4,
            kysymys: 'Mitä opin tänään tiimityöskentelystä?',
            luontipaiva: '12.9.2024',
            kategoria: '3'
        }
    ];

    return (
        <Box>
            <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                {/* <Tabs value={value} onChange={handleChange} >
                    <Tab label='Päivän kysymys' icon={< HelpOutlineOutlinedIcon />} />
                    <Tab label='Kaikki kysymykset' icon={< ListIcon />} />
                    <Tab label='Lisää uusi kysymys' icon={< EditIcon />} />
                    <Tab label='Hae kysymyksiä' icon={< SearchIcon />} />
                </Tabs> */}
                <Toolbar>
                    <IconButton size="large"><MenuIcon /></IconButton>
                    <Typography color="primary">OPPIMISPÄIVÄKIRJA</Typography>
                </Toolbar>
            </AppBar>

            {value === 0 && <RandomKysymys kysymykset={kysymykset} kysymys='kysymys' />}
            {value === 1 && <Kysymyslista kysymykset={kysymykset} />}
            {value === 2 && <Kysymyslomake />}
            {value === 3 && <Kysymyshaku kysymykset={kysymykset} />}

        </Box>
    )
}

export default TabMUI;