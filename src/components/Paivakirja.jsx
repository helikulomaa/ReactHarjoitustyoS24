import { useState } from "react";
import { Box, Paper, Button, Typography, TextField } from "@mui/material";
import { useEffect } from "react";
import { getKysymykset } from "./KysymysService";

function Paivakirja() {
    const [kysymykset, setKysymykset] = useState([]);
    const [virhe, setVirhe] = useState('');

    const haeKysymykset = async () => {
        try {
            let kysymysData = await getKysymykset();
            setKysymykset(kysymysData.data);
            setVirhe('');
        } catch (error) {
            console.log(error);
            setVirhe('Kysymysten haku ei onnistunut');
        }
    }

    useEffect(() => {
        haeKysymykset();
    }, []);

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
