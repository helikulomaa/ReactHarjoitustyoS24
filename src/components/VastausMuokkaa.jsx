import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getVastaukset, editVastaus } from './KysymysService';

function VastausMuokkaa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vastaukset, setVastaukset] = useState(null);
    const [muokattavaVastaus, setMuokattavaVastaus] = useState(null);
    const [virhe, setVirhe] = useState('');
    const [viesti, setViesti] = useState('');


    const haeVastaukset = async () => {
        try {
            const vastausData = await getVastaukset();
            if (vastausData && vastausData.data) {
                setVastaukset(vastausData.data);
                setVirhe('');
                const vastaus = vastausData.data.find((v) => v.id === Number(id));
                if (vastaus) setMuokattavaVastaus(vastaus);
            } else {
                throw new Error("Dataa ei saatu palvelimelta.");
            }
        } catch (error) {
            console.error(error);
            setVirhe('Vastausten haku ei onnistunut.');
        }
    };

    useEffect(() => {
        haeVastaukset();
    }, []);

    const handleSave = async () => {
        try {
            console.log('Muokataan vastausta:', muokattavaVastaus);
            const response = await editVastaus(muokattavaVastaus);
            if (response.status === 200) {
                setViesti('Vastaus päivitetty.');
                setTimeout(() => setViesti(''), 2000);
                // Päivitä paikallinen lista:
                setVastaukset((prev) =>
                    prev.map((v) => (v.id === muokattavaVastaus.id ? muokattavaVastaus : v))
                );
                navigate(`/oppimispaivakirja`);
            } else {
                setViesti(response.message || 'Vastauksen muokkaus epäonnistui.');
            }
        } catch (error) {
            console.error(error);
            setViesti('Vastauksen muokkaus epäonnistui.');
        }
    };


    const handleCancel = () => {
        navigate(`/oppimispaivakirja`);
    };

    if (!muokattavaVastaus) return <Typography>Ladataan...</Typography>;

    return (
        <Box>
            <Paper sx={{ margin: 15, padding: 5 }}>
                <Typography variant="h4" sx={{ margin: 3 }}>
                    Muokkaa vastausta
                </Typography>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <TextField
                        label="Vastaus"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={5}
                        sx={{ width: '90%' }}
                        value={muokattavaVastaus.teksti || ''}
                        onChange={(e) =>
                            setMuokattavaVastaus({
                                ...muokattavaVastaus,
                                teksti: e.target.value,
                            })
                        }
                    />
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Tallenna muutokset
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Peruuta
                        </Button>
                        {viesti && (
                            <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
                                {viesti}
                            </Typography>
                        )}
                    </Box>
                </form>
            </Paper>
        </Box>

    );
}

export default VastausMuokkaa;