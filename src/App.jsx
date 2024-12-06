import { useState } from 'react'
import './App.css'
import { CssBaseline } from '@mui/material';
import Kysymyslista from './components/Kysymyslista';
import Kysymyslomake from './components/Kysymyslomake';
import Kysymyshaku from './components/Kysymyshaku';
import Paivakirja from './components/Paivakirja'
import Virhe from './components/Virhe';
import Vastaukset from './components/Vastaukset';
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
      MuiTab: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: '#000000',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#000000',
          },
        },
      },
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
          element: <Paivakirja />
        },
        {
          path: "/lisaa",
          element: <Kysymyslomake />
        },
        {
          path: "/listaa",
          element: <Kysymyslista />
        },
        {
          path: "/hae",
          element: <Kysymyshaku />
        },
        {
          path: 'virhe/:viesti',
          element: <Virhe />
        },
        {
          path: '/oppimispaivakirja',
          element: <Vastaukset />
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
