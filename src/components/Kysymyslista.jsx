import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getKysymykset } from './KysymysService';
import Virhe from './Virhe';

function Kysymyslista() {

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


    const poistaKysymys = (id) => {
        setKysymykset(kysymykset.filter(kysymys => kysymys.id !== id));
    };

    if (kysymykset.length === 0) {
        return (<p>Kysymyksiä ei löydy</p>);
    }
    return (
        <TableContainer component={Paper} sx={{ margin: 6, padding: 2, width: 'auto', maxWidth: '90%' }} >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>Kysymykset</Typography>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Kysymys</TableCell>
                        <TableCell>Kategoria</TableCell>
                        <TableCell>Lisätty / muokattu</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {kysymykset.map(kysymys => (
                        <TableRow
                            key={kysymys.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{kysymys.kysymys}</TableCell>
                            <TableCell>{kysymys.kategoria}</TableCell>
                            <TableCell>{kysymys.luontipaiva}</TableCell>
                            <TableCell>
                                <IconButton component={Link} to={"/muokkaa/" + kysymys.id}><EditIcon color='secondary' /></IconButton>
                                <IconButton onClick={() => poistaKysymys(kysymys.id)}><DeleteIcon color='error' /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Kysymyslista;
