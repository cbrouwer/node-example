'use strict';

const express = require('express');
var pgp = require('pg-promise')({})
const cn = {
    host: '192.168.1.1',
    port: 5432, 
    database: 'nurab',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
};
const db = pgp(cn); // database instance;

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  db.any('select * from users where active = $1', [true])
    .then(data => {
        console.log('DATA:', data); // print data;
    })
    .catch(error => {
      console.log('ERROR:', error); // print the error;
    })
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
