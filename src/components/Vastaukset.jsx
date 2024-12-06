import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { getVastaukset } from './KysymysService';

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

    return (
        <Box>
            <Paper sx={{ margin: 15, padding: 5 }}>
                <Typography variant='h4' sx={{ margin: 3 }}>Oppimispäiväkirjani</Typography>
                {vastaukset.map(vastaus => (
                    <Box key={vastaus.id}>
                        <Typography sx={{ margin: 2 }}>{new Intl.DateTimeFormat('fi-FI').format(new Date(vastaus.luotupvm))}</Typography>
                        <Typography sx={{ margin: 2 }}>{vastaus.teksti}</Typography>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
}

export default Vastaukset;
