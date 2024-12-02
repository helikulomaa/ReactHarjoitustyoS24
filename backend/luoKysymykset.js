// eslint-disable-next-line no-undef
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('kysymykset.db');

db.serialize(() => {
    // Luodaan taulu kysymykset
    let sql = `
    CREATE TABLE kysymykset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kysymys TEXT NOT NULL,
      luontipaiva DATE NOT NULL,
      kategoria INTEGER NOT NULL,
      kuva TEXT NOT NULL
    )
  `;

    db.run(sql, (error) => {
        if (error) {
            return console.log(error.message);
        }
        console.log("Taulu kysymykset luotiin onnistuneesti.");
    });

    // Lisätään kysymykset tauluun
    const kysymykset = [
        // Kategoria 1
        {
            kysymys: 'Mitä uutta opin tänään jonkin ohjelmointikielen ominaisuuksista?',
            luontipaiva: '2024-11-30',
            kategoria: 1,
            kuva: 'teknologiat.jpg'
        },
        {
            kysymys: 'Mitä opin tänään versionhallinnasta?',
            luontipaiva: '2024-11-30',
            kategoria: 1,
            kuva: 'teknologiat.jpg'
        },
        {
            kysymys: 'Mitä ohjelmointiin liittyvää käsitettä minun oli haastava ymmärtää?',
            luontipaiva: '2024-11-30',
            kategoria: 1,
            kuva: 'teknologiat.jpg'
        },
        {
            kysymys: 'Mitä opin tänään tietokantojen käsittelystä ja SQL-kyselyistä?',
            luontipaiva: '2024-11-30',
            kategoria: 1,
            kuva: 'teknologiat.jpg'
        },
        {
            kysymys: 'Millä tavoin voisin parantaa koodini luettavuutta tai tehokkuutta?',
            luontipaiva: '2024-11-30',
            kategoria: 1,
            kuva: 'teknologiat.jpg'
        },
        {
            kysymys: 'Mitä opin tänään virheidenhallinnasta tai ohjelman testauksesta?',
            luontipaiva: '2024-11-30',
            kategoria: 1,
            kuva: 'teknologiat.jpg'
        },
        {
            kysymys: 'Mihin käsitteeseen haluaisin perehtyä lisää ja miksi?',
            luontipaiva: '2024-11-30',
            kategoria: 1,
            kuva: 'teknologiat.jpg'
        },
        // Kategoria 2
        {
            kysymys: 'Miten tänään sovelletut työskentelytavat tukivat projektin edistymistä?',
            luontipaiva: '2024-11-30',
            kategoria: 2,
            kuva: 'prosessit.jpg'
        },
        {
            kysymys: 'Mitä opin projektinhallintatyökaluista, kuten JIRA:sta tai Trellosta, tänään?',
            luontipaiva: '2024-11-30',
            kategoria: 2,
            kuva: 'prosessit.jpg'
        },
        {
            kysymys: 'Miten SCRUM- tai Kanban-työskentely edisti oppimistani tänään?',
            luontipaiva: '2024-11-30',
            kategoria: 2,
            kuva: 'prosessit.jpg'
        },
        {
            kysymys: 'Miten määrittelin ja toteutin tehtäväni tämän päivän työskentelyssä?',
            luontipaiva: '2024-11-30',
            kategoria: 2,
            kuva: 'prosessit.jpg'
        },
        {
            kysymys: 'Miten palautteen saaminen tai antaminen auttoi minua tänään työskentelyssäni?',
            luontipaiva: '2024-11-30',
            kategoria: 2,
            kuva: 'prosessit.jpg'
        },
        {
            kysymys: 'Mitä olen oppinut ajankäytön hallinnasta ohjelmistokehityksessä?',
            luontipaiva: '2024-11-30',
            kategoria: 2,
            kuva: 'prosessit.jpg'
        },
        {
            kysymys: 'Mitä teen eri tavalla seuraavassa ohjelmistokehitysprojektissani?',
            luontipaiva: '2024-11-30',
            kategoria: 2,
            kuva: 'prosessit.jpg'
        },
        // Kategoria 3
        {
            kysymys: 'Miten tiimityöskentely edisti oppimistani tänään?',
            luontipaiva: '2024-11-30',
            kategoria: 3,
            kuva: 'tiimi.jpg'
        },
        {
            kysymys: 'Miten viestin tänään tiimini kanssa, ja oliko viestintä tehokasta?',
            luontipaiva: '2024-11-30',
            kategoria: 3,
            kuva: 'tiimi.jpg'
        },
        {
            kysymys: 'Miten ymmärsin tänään toisen tiimin jäsenen näkökulmaa tai ongelmaa?',
            luontipaiva: '2024-11-30',
            kategoria: 3,
            kuva: 'tiimi.jpg'
        },
        {
            kysymys: 'Mitä opin palautteen antamisesta tai vastaanottamisesta tiimissäni?',
            luontipaiva: '2024-11-30',
            kategoria: 3,
            kuva: 'tiimi.jpg'
        },
        {
            kysymys: 'Miten yhteistyö tiimin jäsenten välillä auttoi ongelmanratkaisussa tänään?',
            luontipaiva: '2024-11-30',
            kategoria: 3,
            kuva: 'tiimi.jpg'
        },
        {
            kysymys: 'Miten paransin tänään viestintätaitojani ohjelmistokehityksen kontekstissa?',
            luontipaiva: '2024-11-30',
            kategoria: 3,
            kuva: 'tiimi.jpg'
        },
        {
            kysymys: 'Miten ratkaisimme tänään tiiminä mahdolliset erimielisyydet tai haasteet?',
            luontipaiva: '2024-11-30',
            kategoria: 3,
            kuva: 'tiimi.jpg'
        },
        {
            kysymys: 'Mitä haluaisin kehittää omassa vuorovaikutuksessani tulevaisuudessa?',
            luontipaiva: '2024-11-30',
            kategoria: 3,
            kuva: 'tiimi.jpg'
        }
    ];

    kysymykset.forEach((kysymys, index) => {
        sql = `
      INSERT INTO kysymykset (id, kysymys, luontipaiva, kategoria, kuva)
      VALUES (?, ?, ?, ?, ?)
    `;
        db.run(sql, [index + 1, kysymys.kysymys, kysymys.luontipaiva, kysymys.kategoria, kysymys.kuva], (err) => {
            if (err) {
                return console.log(err.message);
            }
        });
    });

    console.log("Kysymykset lisätty tietokantaan.");
    db.close();
});
