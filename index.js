'use strict';

const express = require('express');
const server = express();

// server.get('/', (req,res) => {
//     res.send('Viel Spass')
// })

server.use(express.static('public', {
    extensions:['html', 'htm', 'css','js']
}));



const init = () => {
    server.listen(3300, err => console.log(err || 'Server läuft'));
}

init();


