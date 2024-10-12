import { useState } from "react";
import { Box, Button, Typography, Card, CardHeader, CardContent, CardActions, CardMedia } from "@mui/material";

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
        <Box sx={{ marginTop: 10 }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <Typography variant="h4">{kysymykset[randomIndex][kysymys]}</Typography>
                </CardContent>
                <CardMedia
                    sx={{ height: 570 }}
                    image="/public/images/sulat.jpg"
                />

                <CardActions>
                    <Button variant="contained">Kirjoitan tästä!</Button>
                    <Button variant="outlined" size="small" onClick={updateRandomIndex}>Uusi kysymys</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default RandomKysymys;
