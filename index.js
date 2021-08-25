'use strict';

const express = require('express');
const server = express();

const request = require("request").defaults({ encoding:null});

// const fs = require('fs');
// const { isBuffer } = require('util');

// const dirPath = "./public/img/";
// const filePath = "./public/img/vogel.png"

// read file

// const content = fs.readFile( filePath, 'utf8', (err, data) => {
//     if(err){console.log(err.message)} else {
//          console.log(data);}
// })

// write file


// fs.writeFile(dirPath + "bild.png", data, (err) => {
//     if (err) console.log("data not saved"); else console.log("data is saved");
// })

//  var data = fs.writeFile('./public/file2', 'Hello ' , 'utf8', function(error){
//      if(error) throw error;

//  })

server.use(express.static('public', {
    extensions:['html', 'htm', 'css','js']
}));


const init = () => {
    server.listen(3300, err => console.log(err || 'Server läuft'));
}

init();


