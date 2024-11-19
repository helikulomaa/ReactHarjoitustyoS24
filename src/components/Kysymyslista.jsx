import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Kysymyslista({ kysymykset }) {


    if (kysymykset.length == 0) {
        return (<p>Kysymyksiä ei löydy</p>)
    }
    return (
        <TableContainer component={Paper} sx={{ margin: 6, padding: 2, width: 'auto', maxWidth: '90%' }} >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Kysymys</TableCell>
                        <TableCell>Kategoria</TableCell>
                        <TableCell>Lisäysajankohta</TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer >
    );
}

export default Kysymyslista;