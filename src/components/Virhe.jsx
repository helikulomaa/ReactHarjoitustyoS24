import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useParams } from 'react-router';

function Virhe() {
    let { viesti } = useParams();

    return (
        <Box>
            <Typography color='error'>{viesti}</Typography>
        </Box>
    );
}

export default Virhe;