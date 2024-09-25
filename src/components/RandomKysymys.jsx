import { useState } from "react";

function RandomKysymys({ kysymykset, kysymys }) {
    /* Komponentti ottaa vastaan propsin nimeltä kysymykset. */

    if (kysymykset.length == 0) {
        return (<p>Kysymyksiä ei löydy</p>)
    }

    const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * kysymykset.length));

    // Satunnaisen indeksin päivitys
    const updateRandomIndex = () => {
        setRandomIndex(Math.floor(Math.random() * kysymykset.length));
    }

    return (
        <div> {
            <><p>{kysymykset[randomIndex][kysymys]}</p>
                <button onClick={updateRandomIndex}>Näytä uusi kysymys</button></>
        }
        </div>
    );
}

export default RandomKysymys;
