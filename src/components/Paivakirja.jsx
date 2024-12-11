import { useState } from "react";
import { Box, Paper, Button, Typography, TextField } from "@mui/material";
import { useEffect } from "react";
import { getKysymykset, addVastaus } from "./KysymysService";

function Paivakirja() {
  const [kysymykset, setKysymykset] = useState([]);
  const [virhe, setVirhe] = useState('');
  const [viesti, setViesti] = useState('');
  const [vastaus, setVastaus] = useState('');
  const [vastausLaskuri, setVastausLaskuri] = useState({});
  const [randomIndex, setRandomIndex] = useState(null);

  // Haetaan kysymykset tietokannasta arvottavaksi
  const haeKysymykset = async () => {
    try {
      let kysymysData = await getKysymykset();
      setKysymykset(kysymysData);
      setVirhe('');
    } catch (error) {
      console.log(error);
      setVirhe('Kysymysten haku ei onnistunut');
    }
  }

  useEffect(() => {
    haeKysymykset();
  }, []);

  useEffect(() => {
    if (kysymykset.length > 0) {
      setRandomIndex(Math.floor(Math.random() * kysymykset.length));
    }
  }, [kysymykset]);


  // Vastauksen tallennus
  const muuta = (e) => {
    setVastaus(e.target.value);
  };


  const lisaaVastaus = async () => {
    if (!vastaus) {
      setViesti('Kirjoita jotain.');
    }

    const nykyinenPaiva = new Date().toISOString().split('T')[0];

    const tiedot = {
      teksti: vastaus,
      luotupvm: nykyinenPaiva,
    };

    try {
      console.log("Lähetettävä data (JSON):", JSON.stringify(tiedot));
      const response = await addVastaus(tiedot);
      if (response.status === 201) {
        setViesti('Teksti lisätty.');
        setTimeout(() => {
          setViesti('');
        }, 2000);
        setVastaus(''); // Tyhjennä tekstikentän
      } else {
        setViesti('Tekstin lisääminen ei onnistunut.');
      }
    } catch (error) {
      console.log(error);
      setViesti('Tekstin lisääminen ei onnistunut.');
    }
  }

  // Satunnaisen indeksin päivitys
  const updateRandomIndex = () => {
    setRandomIndex(Math.floor(Math.random() * kysymykset.length));
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Täyttää koko näkymän korkeuden
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          padding: 4,
          width: '60%',
          margin: 'auto',
        }}
      >
        {kysymykset.length > 0 && (
          <>
            <Box sx={{ width: '100%', textAlign: 'center', marginBottom: 2 }}>
              <img
                src={`http://localhost:8080/images/${kysymykset[randomIndex]?.kuva || ''}`}
                alt="Kuva"
                style={{ width: '30%', maxWidth: 300, height: 'auto' }}
              />
            </Box>
            <Typography variant="h5">{kysymykset[randomIndex]?.kysymys || 'Ei kysymystä saatavilla'}</Typography>
          </>
        )}
        <TextField
          label="Vastaus"
          multiline
          rows={5}
          value={vastaus}
          onChange={muuta}
          sx={{ width: '90%' }}
        />

        <Box sx={{ display: 'flex', gap: 2, width: '50%' }}>
          <Button variant="contained" onClick={lisaaVastaus} sx={{ flex: 1 }}>
            Tallenna
          </Button>
          <Button variant="outlined" size="small" onClick={updateRandomIndex} sx={{ flex: 1 }}>
            Uusi kysymys
          </Button>
        </Box>
        {viesti && (<Typography variant="body1" color="secondary"> {viesti}</Typography>)}
      </Paper>
    </Box>
  );
}

export default Paivakirja;
