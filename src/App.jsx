import { useState } from 'react'
import './App.css'
import Kysymyslista from './components/KysymysLista';
import Kysymyslomake from './components/Kysymyslomake';

function App() {

  {/*Kysymykset ja kategoriat luotu ChatGPT:n avulla*/ }

  const kysymykset = [
    {
      id: 1,
      kysymys: 'Mitä tunteita tunsin tänään?',
      luontipaiva: '3.9.2024',
      kategoria: 'Tunteet ja itsehavainnointi',
      kuva: ''
    },
    {
      id: 2,
      kysymys: 'Tuntuiko tänään jokin ihmisuhteisiin liittyvä asia haastavalta?',
      luontipaiva: '12.9.2024',
      kategoria: 'Ihmissuhteet ja vuorovaikutus',
      kuva: ''
    },
    {
      id: 3,
      kysymys: 'Miten edistin tänään tavoitteitani?',
      luontipaiva: '24.9.2024',
      kategoria: 'Itsensäkehittäminen ja tulevaisuus',
      kuva: ''
    }
  ];

  return (
    <>
      <div>
        <Kysymyslista kysymykset={kysymykset} />
        <Kysymyslomake />
      </div>
    </>
  )
}

export default App
