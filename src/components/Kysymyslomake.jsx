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
                kuva: ''
            });
            setViesti('Lisättiin');
        }
    }

    return (
        <form>
            <label>Kysymys <br />
                <input type='text' name='kysymys' value={kysymys.kysymys}
                    onChange={(e) => muuta(e)} /> <br />
            </label>
            <label>Päivämäärä <br />
                <input type='text' name='luontipaiva' value={kysymys.luontipaiva}
                    onChange={(e) => muuta(e)} /> <br />
            </label>
            <label>Kategoria <br />
                <input type='text' name='kategoria' value={kysymys.kategoria}
                    onChange={(e) => muuta(e)} /> <br />
            </label>
            <label>Kuvan linkki <br />
                <input type='text' name='kuva' value={kysymys.kuva}
                    onChange={(e) => muuta(e)} /> <br />
            </label>
            <input type='button' value='Lisää'
                onClick={(e) => lisaaMatka(e)} /><br />
            {viesti}
        </form>
    )
}



export default Kysymyslomake;