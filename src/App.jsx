import { useState } from 'react'
import './App.css'
import { CssBaseline } from '@mui/material';
// import Kysymyslista from './components/Kysymyslista';
// import Kysymyslomake from './components/Kysymyslomake';
// import Kysymyshaku from './components/Kysymyshaku';
// import RandomKysymys from './components/RandomKysymys'
import TabMUI from './navigation/TabMUI';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink, lime, teal } from '@mui/material/colors';


function App() {

  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: lime,
    },
    typography: {
      fontFamily: "'Quicksand', sans-serif",
    }
  })

  return (

    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <TabMUI />
      </Box>
    </ThemeProvider>


    // <>
    //   <div>
    //     <h1>Kysymyksiä päivittäisen kirjoittamisen tueksi</h1>
    //   </div>
    //   <div>
    //     <h2>Päivän kysymys</h2>
    //     <RandomKysymys kysymykset={kysymykset} kysymys='kysymys' />
    //   </div>
    //   <div>
    //     <h2>Kaikki kysymykset</h2>
    //     <Kysymyslista kysymykset={kysymykset} />
    //   </div>
    //   <div>
    //     <Kysymyslomake />
    //   </div>
    //   <div>
    //     <Kysymyshaku kysymykset={kysymykset} />
    //   </div>
    // </>


  )
}

export default App
