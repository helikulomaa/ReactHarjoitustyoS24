const express = require('express');
const app = express();

// Tiedot JSON muodossa
app.use(express.json());

// Tietoturvakirjasto
let helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }));

// Lomakkeita ja kuvia varten
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Mahdollistaa toisilta palvelimilta kutsut
const cors = require('cors');
app.use(cors());


// SQLiten käyttöönotto
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('kysymykset.db');

// Palvelin kuuntelee annettua porttia 
app.listen(8080, () => {
  console.log('Node toimii localhost:8080');
});

// Reititys on pelkkä / esim. localhost:8080/
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Toimii' })
});

app.get('/kysymys/all', (req, res) => {
  db.all('SELECT * FROM Kysymykset', (error, results) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json(results);
  });
});

app.get('/kysymys/:id', (req, res) => {
  let id = Number(req.params.id);
  db.get('SELECT * FROM Kysymykset WHERE id = ?', [id], (error, result) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    if (typeof (result) == 'undefined') {
      return res.status(404).json({ message: 'Haettua kysymystä ei ole' });
    }
    return res.status(200).json(result);
  });
});

// Kuvien käyttöoikeus
app.use('/images', express.static('images'))


//poista kysymys
app.delete('/kysymys/delete/:id', (req, res) => {
  let id = req.params.id;
  db.run('DELETE FROM Kysymykset WHERE id = ?', [id], function (error) {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Kysymystä ei löytynyt' });
    }
    return res.status(200).json({ count: this.changes });
  });
});

//lisää kysymys
app.post('/kysymys/add', (req, res) => {
  let kysymys = req.body;
  db.run('INSERT INTO Kysymykset (kysymys, luontipaiva, kategoria, kuva) VALUES (?, ?, ?, ?)',
    [kysymys.kysymys, kysymys.luontipaiva, kysymys.kategoria, kysymys.kuva], (error) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(200).json({ count: 1 });
    });
});

// Kuvan lataaminen images kansiosta
app.get('/download/:nimi', (req, res) => {
  let file = './images/' + req.params.nimi;
  res.download(file);
});

app.get('/vastaus/all', (req, res) => {
  db.all('SELECT * FROM vastaukset', (error, results) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json(results);
  });
});

// Jos mikään aiempi reititys on sopinut, silloin suoritetaan tämä
app.get('*', (req, res) => {
  return res.status(404).json({ message: 'Ei pyydettyä palvelua' })
});
