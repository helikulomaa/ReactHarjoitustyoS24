import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

function RandomKysymys({ kysymykset, kysymys }) {
    /* Komponentti ottaa vastaan propsin nimeltä kysymykset ja tuon objektin muuttujan nimeltä kysymys */

    if (kysymykset.length == 0) {
        return (<Typography>Kysymyksiä ei löydy</Typography>)
    }

    const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * kysymykset.length));

    // Satunnaisen indeksin päivitys
    const updateRandomIndex = () => {
        setRandomIndex(Math.floor(Math.random() * kysymykset.length));
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
            <Typography variant="h5">{kysymykset[randomIndex][kysymys]}</Typography>
            <Button variant="outlined" size="small" onClick={updateRandomIndex}>Uusi kysymys</Button>
        </Box>
    );
}

export default RandomKysymys;
