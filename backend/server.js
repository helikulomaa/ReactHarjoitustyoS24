const express = require('express');
const app = express();

// Tietoturvakirjasto
let helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }));

// Lomakkeita ja kuvia varten
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Mahdollistaa toisilta palvelimilta kutsut
const cors = require('cors');
app.use(cors());

// Tiedot JSON muodossa
app.use(express.json());

// SQLite mukaan
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

// // Hae kaikki
// app.get('/kysymys/all', (req, res) => {
//   db.all('SELECT halutut tiedot FROM Taulu', (error, results) => {
//     if (error) {
//       return res.status(400).json({ message: error.message });
//     }
//     return res.status(200).json(results);
//   });
// });

// // get by id
// app.get('/kysymys/:id', (req, res) => {
//   let id = Number(req.params.id);

//   db.get('SELECT elain.id, nimi, lajit.lajinimi as laji, kuvaus, kuva, lisatieto FROM elain INNER JOIN lajit ON elain.laji = lajit.id where elain.id=?', [id], (error, result) => {
//     if (error) {
//       return res.status(400).json({ message: error.message });
//     }

//     // Jos haku ei tuottanut yhtään riviä
//     if (typeof (result) == 'undefined') {
//       return res.status(404).json({ message: 'Haettua eläintä ei ole' });
//     }

//     return res.status(200).json(result);
//   });
// });

// // Rivin poistaminen kannasta
// // Kuvan poistamienen puuttuu ratkaisusta -> vaatii tiedostojen hallintaa -> ei kuulu tälle opintojaksolle
// app.delete('/elain/delete/:id', (req, res) => {
//   // Otetaan parametrina tullut id
//   let id = Number(req.params.id);

//   //  db.run('DELETE FROM elain WHERE id = ?', [id], (error)  => {
//   db.run('DELETE FROM elain WHERE id = ?', [id], function (error) {
//     if (error) {
//       return res.status(400).json({ message: error.message });
//     }

//     if (this.changes === 0) {
//       console.log('Poistettavaa eläintä ei ole');
//       return res.status(404).json({ message: 'Poistettavaa eläintä ei ole' })
//     }

//     return res.status(200).json({ count: this.changes });
//   });

// });

// // Kuvan lataaminen palvelimen hakemistoon
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, './images')
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname)
//   }
// });

// const upload = multer({ storage: storage })

// // Kantaan lisääminen ja kuvan vienti images kansioon
// app.post('/elain/add', upload.single('kuva'), (req, res) => {
//   // Lomakkeelta tulleet tiedot
//   let elain = req.body;
//   let kuvanNimi = null; // Jos kuvaa ei ole

//   // Jos tuli tiedosto
//   if (req.file) {
//     kuvanNimi = req.file.originalname; // Kantaan laitettavan kuvan nimi on sama kuin alkuperäisen kuvan nimi
//   }

//   db.run('INSERT INTO elain (nimi, laji, kuvaus, kuva, lisatieto) VALUES (?, ?, ?, ?, ?)',
//     [elain.nimi, elain.laji, elain.kuvaus, kuvanNimi, elain.lisatieto], (error) => {

//       if (error) {
//         return res.status(400).json({ message: error.message });
//       }

//       return res.status(200).json({ count: 1 });
//       // { status: 200, count: 1 }
//     });
// });

// // Kuvan lataaminen images kansiosta
// app.get('/download/:nimi', (req, res) => {
//   let file = './images/' + req.params.nimi;
//   res.download(file);
// });

// // Jos mikään aiempi reititys on sopinut, silloin suoritetaan tämä
// app.get('*', (req, res) => {
//   return res.status(404).json({ message: 'Ei pyydettyä palvelua' })
// });
 