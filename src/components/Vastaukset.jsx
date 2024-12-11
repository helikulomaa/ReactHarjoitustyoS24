import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { getVastaukset, deleteVastaus } from './KysymysService';
import { Link as RouterLink } from 'react-router-dom';

function Vastaukset() {

    const [vastaukset, setVastaukset] = useState([]);
    const [virhe, setVirhe] = useState('');

    const haeVastaukset = async () => {
        try {
            let vastausData = await getVastaukset();
            setVastaukset(vastausData.data);
            setVirhe('');
        } catch (error) {
            console.log(error);
            setVirhe('Vastausten haku ei onnistunut');
        }
    }

    useEffect(() => {
        haeVastaukset();
    }, []);


    if (vastaukset.length === 0) {
        return (<p>Vastauksia ei löydy</p>);
    }

    const poista = (id) => {
        deleteVastaus(id);
        setVastaukset(vastaukset.filter(vastaus => vastaus.id !== id));
    };

    return (
        <Box>
            <Paper sx={{ margin: 15, padding: 5 }}>
                <Typography variant='h4' sx={{ margin: 3 }}>Oppimispäiväkirjani</Typography>
                {vastaukset.map(vastaus => (
                    <Box key={vastaus.id}>
                        <Typography sx={{ margin: 2 }}>{new Intl.DateTimeFormat('fi-FI').format(new Date(vastaus.luotupvm))}</Typography>
                        <Typography sx={{ margin: 2 }}>{vastaus.teksti}</Typography>
                        <Button variant='text' size='small' component={RouterLink} to={`/vastaus/muokkaa/${vastaus.id}`} >Muokkaa</Button>
                        <Button variant='text' size='small' onClick={() => poista(vastaus.id)}>Poista</Button>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
}

export default Vastaukset;
