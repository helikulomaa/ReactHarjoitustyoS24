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
    )`;

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
      INSERT INTO kysymykset (kysymys, luontipaiva, kategoria, kuva)
      VALUES (?, ?, ?, ?)
    `;
        db.run(sql, [kysymys.kysymys, kysymys.luontipaiva, kysymys.kategoria, kysymys.kuva], (err) => {
            if (err) {
                return console.log(err.message);
            }
        });
    });

    console.log("Kysymykset lisätty tietokantaan.");

    const vastaukset = [
        { id: 1, vastaus: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus orci at erat vulputate, a lacinia nulla tincidunt. Donec sollicitudin tortor et nisi egestas, eu vehicula metus efficitur. Nunc at justo vel sem auctor interdum a vel lacus. Curabitur sed felis eget odio scelerisque tincidunt. Aliquam erat volutpat.", luotupvm: "2024-10-01" },
        { id: 2, vastaus: "Vivamus eu turpis turpis. Nunc nec orci at odio posuere cursus. Etiam sit amet libero ac lectus fermentum eleifend. Nulla facilisi. Quisque feugiat urna id erat facilisis, sed auctor justo pellentesque. Curabitur vel mi a eros condimentum varius.", luotupvm: "2024-10-14" },
        { id: 3, vastaus: "Duis sit amet eros in erat varius tincidunt. Sed sit amet urna sit amet nisl volutpat hendrerit. Nam vehicula eros vitae metus viverra, non tincidunt purus convallis. Integer faucibus urna nec velit tincidunt, a convallis elit pretium. Fusce in sapien nisi. In dictum vestibulum magna at elementum.", luotupvm: "2024-10-22" },
        { id: 4, vastaus: "Integer sit amet eros vel elit cursus laoreet. Nulla non vestibulum purus, at posuere magna. Suspendisse potenti. Ut tincidunt, libero ac gravida gravida, nisi urna porttitor lorem. Mauris ut magna et arcu viverra scelerisque. Nam malesuada est sapien, at varius augue cursus vel.", luotupvm: "2024-11-05" },
        { id: 5, vastaus: "Sed ac purus at lorem pharetra tempor. Cras ullamcorper malesuada massa, at fringilla libero placerat eu. Sed fringilla justo felis, id egestas enim volutpat ut. Curabitur at augue eget nisl dignissim gravida. Nunc quis cursus nunc, eget sollicitudin elit. Mauris sagittis nisl sit amet neque lacinia, vitae dictum ligula tincidunt.", luotupvm: "2024-11-11" },
        { id: 6, vastaus: "Quisque at leo sit amet elit scelerisque hendrerit. Aliquam sit amet felis id felis tristique egestas non sit amet leo. Integer vel auctor dui. Morbi posuere libero quis tempor varius. Integer non massa ac libero aliquam fermentum a ac augue. Nulla at cursus erat, id viverra elit.", luotupvm: "2024-11-16" },
        { id: 7, vastaus: "Fusce efficitur felis at velit malesuada, at ullamcorper velit suscipit. Cras accumsan viverra ex, et fermentum justo dictum vel. Mauris vel libero a ligula facilisis vulputate. Aliquam erat volutpat. Nam suscipit, augue id tincidunt mollis, enim nunc auctor libero, vitae fermentum sem dui sed nunc.", luotupvm: "2024-11-20" },
        { id: 8, vastaus: "Cras fermentum felis dui, vel facilisis turpis elementum a. Nulla vitae nulla malesuada, tincidunt orci a, sollicitudin eros. Curabitur eu augue vel lacus convallis ultricies. Etiam interdum nec orci sit amet feugiat. Donec hendrerit ipsum vitae turpis efficitur, et mollis nulla condimentum.", luotupvm: "2024-10-10" },
        { id: 9, vastaus: "Integer ut turpis non erat gravida condimentum et non turpis. Ut id turpis id magna fringilla auctor non eu velit. Donec ut sem sit amet justo facilisis efficitur. Fusce at magna ut lorem elementum luctus. Ut tincidunt, orci vel tempus posuere, augue orci luctus ante, sed vulputate orci purus id odio.", luotupvm: "2024-10-28" },
        { id: 10, vastaus: "Aliquam erat volutpat. Duis ac ipsum ultricies, vulputate purus ac, varius mi. Ut posuere ante sit amet erat consequat, eu euismod eros eleifend. Integer id erat quis turpis iaculis sodales. Nam sed tincidunt nisi. Vivamus tincidunt neque ut purus lacinia, ac scelerisque lectus venenatis.", luotupvm: "2024-11-02" }
    ];


    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS Vastaukset (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                teksti TEXT NOT NULL,
                luotupvm DATE NOT NULL
            )
        ` );

        const stmt = db.prepare("INSERT INTO Vastaukset (teksti, luotupvm) VALUES (?, ?)");
        vastaukset.forEach(vastaus => {
            stmt.run(vastaus.vastaus, vastaus.luotupvm);
        });
        stmt.finalize();

        console.log("Vastaukset on lisätty tietokantaan.");
    });

    db.close();
});
