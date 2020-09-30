const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Top Up
// Show Top Up
app.get('/top-up', (req, res) => {
    let sql = 'SELECT * FROM topup'
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Show 1 Top Up
app.get('/top-up/:id', (req, res) => {
    let sql = 'SELECT * FROM topup WHERE id = ?'
    let query = db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Insert Top Up
app.post('/top-up', (req, res) => {
    const {howto} = req.body

    let sql = `INSERT INTO topup (howto) VALUES ('${howto}')`
    let query = db.query(sql, [req.body], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Delete Top Up
app.delete('/top-up/:id', (req, res) => {
    let sql = 'DELETE FROM transfer WHERE id = ?'
    let query = db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Update Top Up
app.put('/top-up/:id', (req, res) => {
    const id = req.params.id
    const {howto} = req.body

    db.query('UPDATE topup SET howto = ? WHERE id = ?', [howto, id],
    (err, result, fields) => {
        if (err) throw err;
        res.status(201).send('Data succesfully updated');
    });
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
});