import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Kysymyslomake() {
  const Navigate = useNavigate();
  const [kysymys, setKysymys] = useState({
    kysymys: '',
    luontipaiva: new Date(),
    kategoria: '',

  });

  const [viesti, setViesti] = useState('');

  const muuta = (e) => {
    setKysymys({
      ...kysymys,
      [e.target.name]: e.target.value
    })
    setViesti('');
  }

  const lisaaKysymys = async () => {
    if (kysymys.kysymys.length === 0) {
      setViesti('Lisää kysymys.')
    }

    else if (kysymys.kategoria.length === 0) {
      setViesti('Valitse kategoria.');
      return;
    } else {

      const nykyinenPaiva = new Date().toLocaleDateString('fi-FI');

      // setKysymys({
      //   kysymys: '',
      //   kategoria: '',
      // });

      // setViesti("Kysymys lisätty.");
      // // Piilota viesti 5 sekunnin kuluttua
      // setTimeout(() => {
      //   setViesti('');
      // }, 2000);

      const formData = new FormData();
      formData.append('kysymys', kysymys.kysymys);
      formData.append('kategoria', kysymys.kategoria);
      formData.append('luontipaiva', nykyinenPaiva);
      let kuva = '';
      if (kysymys.kategoria === '1') {
        kuva = 'teknologiat.png';
      } else if (kysymys.kategoria === '2') {
        kuva = 'prosessit.png';
      } else {
        kuva = 'tiimi.png';
      }
      formData.append('kuva', kuva);

      try {
        const response = await addKysymys(formData);
        if (response.status === 200) {
          setViesti('Kysymys lisätty.');
          setTimeout(() => {
            setViesti('');
          }, 2000);
        } else {
          Navigate("/virhe/Lisäys ei onnistunut");
        }
      } catch (error) {
        console.log(error);
        Navigate("/virhe/Lisäys ei onnistunut");
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
            <Typography variant="h4" align="center">Uusi kysymys</Typography>

            <TextField
              label="Kysymys"
              name="kysymys"
              value={kysymys.kysymys}
              onChange={(e) => muuta(e)}
              variant="outlined"
              fullWidth
            />

            <Box>
              <FormLabel>Kysymyksen kategoria</FormLabel>
              <RadioGroup
                name="kategoria"
                value={kysymys.kategoria}
                onChange={muuta}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Ohjelmistokehityksen teknologioihin liittyvät taidot"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Ohjelmistokehityksen prosesseihin ja työnkulkuihin liittyvät taidot"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Yhteistyö- ja vuorovaikutustaidot"
                />
              </RadioGroup>
            </Box>

            <Button variant="contained" onClick={(e) => lisaaKysymys(e)}>
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
}

  export default Kysymyslomake;
