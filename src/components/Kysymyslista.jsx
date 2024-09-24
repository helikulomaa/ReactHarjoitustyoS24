function Kysymyslista({ kysymykset }) {
    /* Komponentti ottaa vastaan propsin nimeltä kysymykset. */

    if (kysymykset.length == 0) {
        return (<p>Kysymyksiä ei löydy</p>)
    }
    return (
        <div> {
            kysymykset.map(kysymys => {
                return (
                    <p key={kysymys.id}>
                        {kysymys.kysymys}
                    </p>
                );
            })
        }
        </div>
    );
}

export default Kysymyslista;