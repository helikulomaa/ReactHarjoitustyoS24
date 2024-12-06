import { useState, useEffect } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, TextField, Select, MenuItem, Paper } from "@mui/material";
import { getKysymykset } from './KysymysService';

function Kysymyshaku() {
    const [kategoria, setKategoria] = useState('');
    const [hakusana, setHakusana] = useState('');
    const [haetaan, setHaetaan] = useState(false);
    const [kysymykset, setKysymykset] = useState([]);
    const [virhe, setVirhe] = useState('');

    const haeKysymyksetTietokannasta = async () => {
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
        haeKysymyksetTietokannasta();
    }, []);

    const muutaHakusana = (e) => {
        setHakusana(e.target.value);
        setHaetaan(false);
    };

    const muutaKategoria = (e) => {
        setKategoria(e.target.value);
        setHaetaan(false);
    };

    const hae = () => {
        setHaetaan(true);
    };

    const haeKysymykset = () => {
        if (haetaan) {
            let result = kysymykset;

            // Filtteröi kategorian perusteella, jos kategoria on valittu
            if (kategoria) {
                result = result.filter(kysymys => kysymys.kategoria.toString() === kategoria.toString());
            }

            // Filtteröi hakusanan perusteella
            if (hakusana) {
                const lowerCaseHakusana = hakusana.toLowerCase();
                result = result.filter(kysymys => kysymys.kysymys.toLowerCase().includes(lowerCaseHakusana));
            }

            const kysymystenMaara = result.length;

            if (kysymystenMaara > 0) {
                return (
                    <Box>
                        <Paper sx={{ padding: 3 }}>

                            <Typography variant="h6" mb={2}>
                                Haulla löytyi {kysymystenMaara} kysymystä
                            </Typography>
                            <List>
                                {result.map(kysymys => (
                                    <ListItem key={kysymys.id}>
                                        <ListItemText primary={kysymys.kysymys} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Box>
                );
            } else {
                return <Typography>Ei tuloksia hakuehdoilla</Typography>;
            }
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            gap={2}
        >
            <Typography variant="h6">Hae kysymyksiä</Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
                <TextField
                    label="Hae sanalla"
                    variant="outlined"
                    name="hakusana"
                    value={hakusana}
                    onChange={muutaHakusana}
                    size="small"
                    fullWidth
                />
                <Select
                    value={kategoria}
                    onChange={muutaKategoria}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem value="">Kaikki kategoriat</MenuItem>
                    <MenuItem value="1">Ohjelmistokehityksen teknologiat</MenuItem>
                    <MenuItem value="2">Ohjelmistokehityksen prosessit</MenuItem>
                    <MenuItem value="3">Yhteistyö- ja vuorovaikutustaidot</MenuItem>
                </Select>
                <Button variant="contained" onClick={hae} fullWidth>
                    Hae
                </Button>
            </Box>
            <Box mt={4}>
                {haeKysymykset()}
            </Box>
        </Box>
    );
}

export default Kysymyshaku;
