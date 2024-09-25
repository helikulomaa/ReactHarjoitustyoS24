import { useState } from 'react'
import './App.css'
import Kysymyslista from './components/KysymysLista';
import Kysymyslomake from './components/Kysymyslomake';
import Kysymyshaku from './components/Kysymyshaku';
import RandomKysymys from './components/RandomKysymys'

function App() {

  {/*Kysymykset ja kategoriat luotu ChatGPT:n avulla*/ }

  const kysymykset = [
    {
      id: 1,
      kysymys: 'Mitä tunteita tunsin tänään?',
      luontipaiva: '3.9.2024',
      kategoria: '2'
    },
    {
      id: 2,
      kysymys: 'Tuntuiko tänään jokin ihmisuhteisiin liittyvä asia haastavalta?',
      luontipaiva: '12.9.2024',
      kategoria: '3'
    },
    {
      id: 3,
      kysymys: 'Miten edistin tänään tavoitteitani?',
      luontipaiva: '24.9.2024',
      kategoria: '4',

    },
    {
      id: 4,
      kysymys: 'Mikä vuorovaikutus tilanne meni tänään hyvin ja miksi?',
      luontipaiva: '12.9.2024',
      kategoria: '3'
    }
  ];

  return (
    <>
      <div>
        <h1>Kysymyksiä päivittäisen kirjoittamisen tueksi</h1>
      </div>
      <div>
        <h2>Päivän kysymys</h2>
        <RandomKysymys kysymykset={kysymykset} kysymys='kysymys' />
      </div>
      <div>
        <h2>Kaikki kysymykset</h2>
        <Kysymyslista kysymykset={kysymykset} />
      </div>
      <div>
        <Kysymyslomake />
      </div>
      <div>
        <Kysymyshaku kysymykset={kysymykset} />
      </div>
    </>
  )
}

export default App
