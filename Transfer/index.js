const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Connecting
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zwallet'
});

db.connect(err => {
    if (!err)
    console.log('DB connection succed.');
    else 
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

// Transfer
// Show transfer
app.get('/transfer', (req, res) => {
    let sql = 'SELECT * FROM transfer'
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Show 1 transfer
app.get('/transfer/:id', (req, res) => {
    let sql = 'SELECT * FROM transfer WHERE id = ?'
    let query = db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Delete a transfer
app.delete('/transfer/:id', (req, res) => {
    let sql = 'DELETE FROM transfer WHERE id = ?'
    let query = db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log('Deleted Successfully');
        res.status(200).send('Deleted Successfully');
    });
});

// Insert a transfer
app.post('/transfer', (req, res) => {
    const {
        amount,
        balance_left,
        notes
    } = req.body

    let sql = `INSERT INTO transfer (amount, balance_left, notes) VALUES ('${amount}', '${balance_left}', '${notes}')`
    let query = db.query(sql, [req.body], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Update transfer
app.put('/transfer/:id', (req, res) => {
    const id = req.params.id;
    const {
        amount,
        balance_left,
        notes
    } = req.body

    db.query('UPDATE transfer SET amount = ?, balance_left = ?, notes = ?', [amount, balance_left, notes, id], 
    (err, result, fields) => {
        if (err) throw err;
        res.status(201).send('Data succesfully updated');
    });
});

// End transfer




app.listen(8000, () => {
    console.log('Server connected to port 8000');
});