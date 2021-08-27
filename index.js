'use strict';
let bild;
//require('dotenv').config
const express = require('express');
const server = express();
const fs = require('fs');
const { request } = require('http');
const db = require('nano')('http://silvia:wu2du3!!@localhost:5984').db;

//ROUTEN
server.use(express.json());
let requestBody;
server.post('/saveImage', function (request, response) {
    requestBody = request.body;
    response.writeHead(200,{'Content-Type': 'text/html'});
    saveInDB(request.body);
    response.end('received')
})

/* server.get('/getImages', function (request, response){

Bilder aus Datenbank holen und an Client senden


})

 */

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

// Bild und Bildnamen in Datenbank speichern
function saveInDB(body){

    dbBeispiel.insert(requestBody).then(
        res => console.log(res)
    ).catch(
        console.log
    )
}

server.use(express.static('public', {
    extensions: ['html', 'htm', 'css', 'js']
}));

const init = () => {
    server.listen(3300, err => console.log(err || 'Server läuft'));
}

init();