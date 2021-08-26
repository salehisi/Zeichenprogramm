'use strict';
let bild;
//require('dotenv').config
const express = require('express');
const server = express();
const fs = require('fs');
const db = require('nano')('http://silvia:wu2du3!!@localhost:5984').db;
server.use(express.json());

//Route für POST von Client
server.post('/saveImage', function (request, response) {

    console.dir(request.body);
    // response.writeHead(200,{'Content-Type': 'text/html'});
    response.end('received')
})

// CouchDB
let dbName = 'bilder';
let dbBeispiel = db.use(dbName);
// List ohne Parameter liefert nur ID und Revision
dbBeispiel.list().then(
    res => res.rows.map(el => el.value)
).then(
    res => console.log(res)
).catch(
    console.log
)

server.use(express.static('public', {
    extensions: ['html', 'htm', 'css', 'js']
}));

const init = () => {
    server.listen(3300, err => console.log(err || 'Server läuft'));
}

init();


