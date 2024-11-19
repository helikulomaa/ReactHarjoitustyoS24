import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';

function Kysymyslomake() {
    const [kysymys, setKysymys] = useState({
        kysymys: '',
        luontipaiva: '',
        kategoria: '',
        kuva: ''

    });

    const [viesti, setViesti] = useState('');

    const muuta = (e) => {
        setKysymys({
            ...kysymys,
            [e.target.name]: e.target.value
        })
        setViesti('');
    }

    const lisaaKysymys = (e) => {
        if (kysymys.kysymys.length === 0) {
            setViesti('Lisää kysymys.')
        } else {
            setKysymys({
                kysymys: '',
                luontipaiva: '',
                kategoria: '',
            });
            setViesti('Lisättiin');
        }
    }

    return (
<Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%' }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" align="center">Lisää uusi kysymys</Typography>
          
          <TextField
            label="Kysymys"
            name="kysymys"
            value={kysymys.kysymys}
            onChange={(e) => muuta(e)}
            variant="outlined"
            fullWidth
          />
          
          <TextField
            label="Päivämäärä"
            name="luontipaiva"
            value={kysymys.luontipaiva}
            onChange={(e) => muuta(e)}
            variant="outlined"
            fullWidth
          />
          
          <TextField
            label="Kategorian numero (1. Ohjelmistokehityksen teknologioihin liittyvät taidot, 2. Ohjelmistokehityksen prosesseihin ja työnkulkuihin liittyvät taidot, 3. Yhteistyö- ja vuorovaikutustaidot)"
            name="kategoria"
            value={kysymys.kategoria}
            onChange={(e) => muuta(e)}
            variant="outlined"
            fullWidth
          />
          
          <Button variant="contained" onClick={(e) => lisaaMatka(e)}>
            Lisää
          </Button>
          
          {viesti && (
            <Typography variant="body1" color="primary" align="center">
              {viesti}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
    )
}



export default Kysymyslomake;
