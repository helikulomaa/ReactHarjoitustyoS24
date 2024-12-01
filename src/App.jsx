import { useState } from 'react'
import './App.css'
import { CssBaseline } from '@mui/material';
import Kysymyslista from './components/Kysymyslista';
import Kysymyslomake from './components/Kysymyslomake';
import Kysymyshaku from './components/Kysymyshaku';
import Paivakirja from './components/Paivakirja'
import KysymysMuokkaa from './components/KysymysMuokkaa';
import MenuMUI from './navigation/MenuMUI';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { amber, green, teal } from '@mui/material/colors';
import { createBrowserRouter, RouterProvider, useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';


function App() {

  const theme = createTheme({
    palette: {
      primary: { main: green[700] },
      secondary: amber
    },
    typography: {
      fontFamily: "'Quicksand', sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minHeight: '100vh', // vie koko taustan
            position: 'relative',
            overflow: 'hidden', // jos ei mahdu, piilotetaan
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url(images/tausta.jpg)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundAttachment: 'fixed',
              zIndex: -1, // Viedään kaiken taakse
            },
          },
        },
      },
    }
  })

  const [kysymykset, setKysymykset] = useState([
    {
      id: 1,
      kysymys: 'Minkä niksin opin tänään harjoittelemastani ohjelmointikielestä tai työkalusta?',
      luontipaiva: '3.9.2024',
      kategoria: '1'
    },
    {
      id: 2,
      kysymys: 'Mitä opin tänään SCRUM-työskentelystä?',
      luontipaiva: '12.9.2024',
      kategoria: '2'
    },
    {
      id: 3,
      kysymys: 'Minkä ymmärtäminen tuntui vaikealta tänään?',
      luontipaiva: '24.9.2024',
      kategoria: '1',

    },
    {
      id: 4,
      kysymys: 'Mitä opin tänään tiimityöskentelystä?',
      luontipaiva: '12.9.2024',
      kategoria: '3'
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
