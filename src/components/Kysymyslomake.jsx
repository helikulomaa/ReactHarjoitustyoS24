import { useState } from 'react';

function Kysymyslomake() {
    const [kysymys, setKysymys] = useState({
        kysymys: '',
        luontipaiva: '',
        kategoria: '',
        kuva: ''

    });

    const [viesti, setViesti] = useState('');

    const muuta = (e) => {
        setKysymys({
            ...kysymys,
            [e.target.name]: e.target.value
        })
        setViesti('');
    }

    const lisaaKysymys = (e) => {
        if (kysymys.kysymys.length === 0) {
            setViesti('Lisää kysymys.')
        } else {
            setMatka({
                kysymys: '',
                luontipaiva: '',
                kategoria: '',
            });
            setViesti('Lisättiin');
        }
    }

    return (
        <form>
            <h2>Lisää uusi kysymys</h2>
            <label>Kysymys <br />
                <input type='text' name='kysymys' value={kysymys.kysymys}
                    onChange={(e) => muuta(e)} /> <br />
            </label>
            <label>Päivämäärä <br />
                <input type='text' name='luontipaiva' value={kysymys.luontipaiva}
                    onChange={(e) => muuta(e)} /> <br />
            </label>
            <label>Kategorian numero (1.Yleisiä kysymyksiä liittyen päivään, 2. Tunteet ja itsehavainnointi <br />
                3. Ihmissuhteet ja vuorovaikutus 4. Tulevaisuus ja Itsensäkehittäminen) <br />
                <input type='text' name='kategoria' value={kysymys.kategoria}
                    onChange={(e) => muuta(e)} /> <br />
            </label>
            <input type='button' value='Lisää'
                onClick={(e) => lisaaMatka(e)} /><br />
            {viesti}
        </form>
    )
}



export default Kysymyslomake;