import { useState } from 'react';
import { Box, Button, Typography, List, ListItem, TextField } from "@mui/material";

function Kysymyshaku({ kysymykset }) {
    const [kategoria, setKategoria] = useState('');
    const [haetaan, setHaetaan] = useState(false);

    const muuta = (e) => {
        setKategoria(e.target.value);
        setHaetaan(false);
    }

    const hae = () => {
        setHaetaan(true);
    }

    const haeKysymykset = () => {
        // Jos Hae painiketta on painettu
        if (haetaan) {
            // Filtteröidään taulukosta paikkakunnan perusteella
            let result = kysymykset.filter(kysymys => kysymys.kategoria === kategoria);

            // Jos filterointi tuotti tulosta
            if (result.length > 0) {
                // Muuttuja, jonka sisältönä tulee olemaan haun tulos
                let haku = result.map(kysymys => {
                    return (
                        <Typography key={kysymys.id}>{kysymys.kysymys}</Typography>
                    ); // return
                }) // map

                return (haku);
            } else {
                return (<Typography>Kyseisessä kategoriassa ei ole kysymyksiä</Typography>);
            } // if result.length
        } // if haetaan
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"   // Keskittää sisällön vaakasuunnassa
            justifyContent="center" // Keskittää sisällön pystysuunnassa
            minHeight="100vh" // Asettaa boksin korkeudeksi koko näkyvän ruudun
            gap={2} // Väliä elementtien väliin
        >
            <Typography variant='h6'>Hae kysymyksiä kategorian numerolla</Typography>
            <List>
                <ListItem>1. Ohjelmistokehityksen teknologioihin liittyvät taidot</ListItem>
                <ListItem>2. Ohjelmistokehityksen prosesseihin ja työnkulkuihin liittyvät taidot</ListItem>
                <ListItem>3. Yhteistyö- ja vuorovaikutustaidot</ListItem>
            </List>
            <Box component="form" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1">Kategorian numero</Typography>
                <TextField
                    variant="outlined"
                    name="kategoria"
                    value={kategoria}
                    onChange={(e) => muuta(e)}
                    size="small"
                />
                <Button variant="contained" onClick={() => hae()}>
                    Hae
                </Button>
            </Box>
            <Box>
                {haeKysymykset()}
            </Box>
        </Box>
    )
}

export default Kysymyshaku;
