import { AppBar, Box, ListItemIcon, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
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
            kysymys: 'Mitä tunteita tunsin tänään?',
            luontipaiva: '3.9.2024',
            kategoria: '2'
        },
        {
            id: 2,
            kysymys: 'Tuntuiko tänään jokin ihmisuhteisiin liittyvä asia haastavalta?',
            luontipaiva: '12.9.2024',
            kategoria: '3'
        },
        {
            id: 3,
            kysymys: 'Miten edistin tänään tavoitteitani?',
            luontipaiva: '24.9.2024',
            kategoria: '4',

        },
        {
            id: 4,
            kysymys: 'Mikä vuorovaikutus tilanne meni tänään hyvin ja miksi?',
            luontipaiva: '12.9.2024',
            kategoria: '3'
        }
    ];

    return (
        <Box>
            <AppBar position="static" >
                <Tabs value={value} onChange={handleChange} textColor="inherit" >
                    <Tab label='Etusivu' icon={< HomeIcon />} />
                    <Tab label='Kaikki kysymykset' icon={< ListIcon />} />
                    <Tab label='Lisää uusi kysymys' icon={< EditIcon />} />
                    <Tab label='Hae kysymyksiä' icon={< SearchIcon />} />
                </Tabs>
            </AppBar>

            {value === 0 && <RandomKysymys kysymykset={kysymykset} kysymys='kysymys' />}
            {value === 1 && <Kysymyslista kysymykset={kysymykset} />}
            {value === 2 && <Kysymyslomake />}
            {value === 3 && <Kysymyshaku kysymykset={kysymykset} />}

        </Box>
    )
}

export default TabMUI;