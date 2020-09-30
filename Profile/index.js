const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

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

// Profile
// Show Profile
app.get('/profile', (req, res) => {
    let sql = 'SELECT * FROM profile'
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Search and Sorting by Name
app.get('/profile/:first_name', (req, res) => {
    let first_name = req.params.first_name

    db.query(`SELECT * FROM profile WHERE first_name LIKE '%${first_name}%' ORDER BY first_name ASC`, [first_name], 
    (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
});

// Show 1 profile
app.get('/profile/:id', (req, res) => {
    let sql = 'SELECT * FROM profile WHERE id = ?'
    let query = db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Delete a profile
app.delete('/profile/:id', (req, res) => {
    let sql = 'DELETE FROM profile WHERE id = ?'
    let query = db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log('Deleted Successfully');
        res.status(200).send('Deleted Successfully');
    });
});

// Insert a Profile
app.post('/profile', (req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone,
        pin_confirm,
        password,
        photo
    } = req.body

    let sql = `INSERT INTO profile (first_name, last_name, email, phone, pin_confirm, password, photo) VALUES ('${first_name}', '${last_name}', '${email}', '${phone}', ${pin_confirm}, '${password}', '${photo}')`
    let query = db.query(sql, [req.body], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result);
    });
});

// Update Profile
app.put('/profile/:id', (req, res) => {
    const id = req.params.id 
    const {
        first_name,
        last_name,
        email,
        phone,
        pin_confirm,
        password,
        photo
    } = req.body

    db.query('UPDATE profile SET first_name = ?, last_name = ?, email = ?, phone = ?, pin_confirm = ?, password = ?, photo = ? WHERE id = ?', [first_name, last_name, email, phone, pin_confirm, password, photo, id], 
    (err, result, fields) => {
        if (err) throw err;
        res.status(201).send('Data succesfully updated');
    });
});

// End Profile

app.listen(8000, () => {
    console.log('SERVER RUNNING ON PORT 8000')
});