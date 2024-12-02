import { useState } from 'react'
import './App.css'
import { CssBaseline } from '@mui/material';
import Kysymyslista from './components/Kysymyslista';
import Kysymyslomake from './components/Kysymyslomake';
import Kysymyshaku from './components/Kysymyshaku';
import Paivakirja from './components/Paivakirja'
import KysymysMuokkaa from './components/KysymysMuokkaa';
import Virhe from './components/Virhe';
import MenuMUI from './navigation/MenuMUI';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  yellow
  , blueGrey
} from '@mui/material/colors';
import { createBrowserRouter, RouterProvider, useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';


function App() {

  const theme = createTheme({
    palette: {
      primary: { main: yellow[700] },
      secondary: { main: blueGrey[700] },
    },
    typography: {
      fontFamily: "'Quicksand', sans-serif",
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#f5f5f5', // Vaaleanharmaa tausta
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: blueGrey[700], // oletusväri kaikille nappuloille
            color: '#fff', // Valkoinen teksti
            '&:hover': {
              backgroundColor: blueGrey[800], // Tummempi hover-tilassa
            },
          },
          outlined: {
            backgroundColor: 'transparent', // Läpinäkyvä tausta outlined-nappuloille
            color: blueGrey[700], // Käytä sininen-harmaata tekstivärinä
            border: `1px solid ${blueGrey[700]}`, // Outline-väri
            '&:hover': {
              backgroundColor: blueGrey[50], // Vaalea hover-tausta
              border: `1px solid ${blueGrey[800]}`, // Tummempi reunus hover-tilassa
            },
          },
        },
      },
    },
  });

  const [kysymykset, setKysymykset] = useState([
    {
      id: 1,
      kysymys: 'Minkä niksin opin tänään harjoittelemastani ohjelmointikielestä tai työkalusta?',
      luontipaiva: '3.9.2024',
      kategoria: '1',
      kuva: '../images/teknologiat.jpg'
    },
    {
      id: 2,
      kysymys: 'Mitä opin tänään SCRUM-työskentelystä?',
      luontipaiva: '12.9.2024',
      kategoria: '2',
      kuva: '../images/prosessit.jpg'
    },
    {
      id: 3,
      kysymys: 'Minkä ymmärtäminen tuntui vaikealta tänään?',
      luontipaiva: '24.9.2024',
      kategoria: '1',
      kuva: '../images/teknologiat.jpg'
    },
    {
      id: 4,
      kysymys: 'Mitä opin tänään tiimityöskentelystä?',
      luontipaiva: '12.9.2024',
      kategoria: '3',
      kuva: '../images/tiimi.jpg'
    }
  ]);

  function Error() {
    let error = useRouteError();
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return (
          <Box component='h3'>
            404 Kyseistä sivua ei ole <Link to='/'>Etusivulle</Link>
          </Box>
        )
      }

      return (
        <Box component='h3'>
          {error.status} {error.data} <Link to='/'>Etusivulle</Link>
        </Box>
      );
    }

    return (
      <Box component='h3'>
        {error.message} <Link to='/'>Etusivulle</Link>
      </Box>
    );
  }

  const router = createBrowserRouter([
    {
      element: <MenuMUI />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Paivakirja kysymykset={kysymykset} kysymys='kysymys' />
        },
        {
          path: "/lisaa",
          element: <Kysymyslomake />
        },
        {
          path: "/listaa",
          element: <Kysymyslista alkuperaisetKysymykset={kysymykset} />
        },
        {
          path: "/hae",
          element: <Kysymyshaku kysymykset={kysymykset} />
        },
        {
          path: "/muokkaa/:id",
          element: <KysymysMuokkaa kysymykset={kysymykset} />
        },
        {
          path: 'virhe/:viesti',
          element: <Virhe />
        }
      ]
    },
  ]);



  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
