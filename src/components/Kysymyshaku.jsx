import { useState } from 'react';

function Kysymyshaku({ kysymykset }) {
    const [kategoria, setKategoria] = useState('');
    const [haetaan, setHaetaan] = useState(false);

    const muuta = (e) => {
        setKategoria(e.target.value);
        setHaetaan(false);
    }

    const hae = () => {
        setHaetaan(true);
    }

    const haeKysymykset = () => {
        // Jos Hae painiketta on painettu
        if (haetaan) {
            // Filtteröidään taulukosta paikkakunnan perusteella
            let result = kysymykset.filter(kysymys => kysymys.kategoria === kategoria);

            // Jos filterointi tuotti tulosta
            if (result.length > 0) {
                // Muuttuja, jonka sisältönä tulee olemaan haun tulos
                let haku = result.map(kysymys => {
                    return (
                        <p key={kysymys.id}>
                            {kysymys.kysymys}
                        </p>
                    ); // return
                }) // map

                return (haku);
            } else {
                return (<p>Kyseisessä kategoriassa ei ole kysymyksiä</p>);
            } // if result.length
        } // if haetaan
    }

    return (
        <div>
            <h2>Hae kysymyksiä kategorialla</h2>
            <ol>
                <li>Yleisiä kysymyksiä liittyen päivään</li>
                <li>Tunteet ja itsehavainnointi</li>
                <li>Ihmissuhteet ja vuorovaikutus</li>
                <li>Tulevaisuus ja Itsensäkehittäminen</li>
            </ol>
            <form>
                <label>Kategorian numero <br />
                    <input type='text' name='kategoria' value={kategoria}
                        onChange={(e) => muuta(e)} />&nbsp;
                </label>
                <input type='button' value='Hae' onClick={() => hae()} />
            </form>

            {haeKysymykset()}
        </div>
    )
}

export default Kysymyshaku;
