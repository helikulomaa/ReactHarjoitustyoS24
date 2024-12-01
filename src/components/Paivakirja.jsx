import { useState } from "react";
import { Box, Paper, Button, Typography, TextField } from "@mui/material";

function Paivakirja({ kysymykset, kysymys }) {
    /* Komponentti ottaa vastaan propsin nimeltä kysymykset ja tuon objektin muuttujan nimeltä kysymys */

    const [merkinta, setMerkinta] = useState('');
    const [vastausLaskuri, setVastausLaskuri] = useState({});
    const [viesti, setViesti] = useState('');
    const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * kysymykset.length));

    // Tallenna vastaus
    const tallennaVastaus = () => {
        if (!merkinta.trim()) {
            setViesti('Kirjoita vastaus ennen tallennusta.');
            return;
        }

        // Päivitä laskuri
        const laskuriPaivitys = { ...vastausLaskuri };
        laskuriPaivitys[kysymys.id] = (laskuriPaivitys[kysymys.id] || 0) + 1;
        setVastausLaskuri(laskuriPaivitys);

        setViesti('Tallennettu!');
        setTimeout(() => {
            setViesti('');
        }, 2000);
        setMerkinta('');
    };

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
                <Typography variant="h5">{kysymykset[randomIndex][kysymys]}</Typography>
                <TextField
                    label="Vastaus"
                    multiline
                    rows={5}
                    value={merkinta}
                    onChange={(e) => setMerkinta(e.target.value)}
                    sx={{ width: '90%' }}
                />
                <Box sx={{ display: 'flex', gap: 2, width: '50%' }}>
                    <Button variant="contained" onClick={tallennaVastaus} sx={{ flex: 1 }}>
                        Tallenna
                    </Button>
                    <Button variant="outlined" size="small" onClick={updateRandomIndex} sx={{ flex: 1 }}>
                        Uusi kysymys
                    </Button>
                </Box>
                {viesti && (<Typography variant="body1" color="primary"> {viesti}</Typography>)}
            </Paper>
        </Box>
    );
}

export default Paivakirja;
