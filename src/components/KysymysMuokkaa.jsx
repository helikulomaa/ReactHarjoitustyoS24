import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function KysymysMuokkaa({ kysymykset }) {
    let { id } = useParams();
    id = Number(id);
    const etsitty = kysymykset.find(kysymys => kysymys.id === id);

    const [kysymys, setValues] = useState({
        id: id,
        kysymys: etsitty.kysymys
    });

    const [viesti, setViesti] = useState('');

    const muuta = (e) => {
        setValues({
            ...kysymys,
            [e.target.name]: e.target.value
        });
    };

    const muutaKysymys = () => {
        setViesti("Kysymys päivitetty");
        setTimeout(() => {
            setViesti('');
        }, 2000);

    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, width: '100%' }}>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={muutaKysymys}>
                    <TextField
                        label='Kysymys'
                        name='kysymys'
                        value={kysymys.kysymys}
                        onChange={muuta}
                        fullWidth
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button onClick={muutaKysymys} variant='contained' color='primary' sx={{ flex: 1 }}>
                            Päivitä
                        </Button>
                        <Button variant='outlined' component={Link} to={"/listaa"} sx={{ flex: 1 }}>Takaisin</Button>
                    </Box>
                    <Typography variant="body1" color="primary" align="center">{viesti}</Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default KysymysMuokkaa;