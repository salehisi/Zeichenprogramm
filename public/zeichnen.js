'use strict';
let imageURL, imageData, file;
let newOption;

document.addEventListener('DOMContentLoaded', event => {
    let lastX, lastY;
    let zeichnen = false;

    const pencil = document.querySelector('#pen-pencil');
    const brush = document.querySelector('#pen-brush');
    const pensize = document.querySelector('#pen-size');
    const color = document.querySelector('#pen-color');
    const reset = document.querySelector('#reset');
    const save = document.querySelector('#save');
    const imageLoader = document.querySelector('#uploader');
    const upLoaderS = document.querySelector('#upLoaderS');
    const canvas = document.querySelector('#canvas-wrapper');
    const context = canvas.getContext('2d');

    // Alle vorhandene Bilder aus Datenbank abfragen
/*     upLoaderS.onclick = function() {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log("success");
            } else console.log('error' + this.status)
        };
        xhr.open("GET", '/getImages');
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send();
    }
    */
   // Die vorhandenen Bilder aus der Datenbank als Auswahloptionen anzeigen
   // zuerst das html snippet
   // function createNewOptions() {
   //     for (var i = 0; i < nameList.length; i++) {
   //         newOption = documet.createElement("option");
   //         newOption.value = nameList[i];
   //         newOption.text = nameList[i];
   //     } try {
   //         select.add(newOption);
   //     } catch (e) {
   //         select.appendChild(newOption);
   //     }
   // }
   
    save.onsubmit = function () {
        //     const name =
        submitFunction();  // daten werde bearbeitet ohne das formular zu verlassen
        return false; // mit return false wird verhindert dass das Formular verschickt wird
    }
    // Canvas Daten an Serversenden
    function submitFunction() {
        const canvasContent = canvas.toDataURL();
        const name = document.querySelector('#bildname').value
        const data = { image: canvasContent, name: name };
        const jsonData = JSON.stringify(data);
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log("success");
            } else console.log('error' + this.status)
        };
        xhr.open("POST", '/saveImage');
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(jsonData);
    }
    // Bilder lokal speichern
    // save.addEventListener("click", function () {

    //     const image = canvas.toDataURL();
    //     const link = document.createElement("a");
    //     link.href = image;
    //     link.download = "bild.png";
    //     link.click();   
    // });


    let heightRatio = 0.7;
    canvas.height = canvas.width * heightRatio;

    pencil.oninput = function () {
        context.lineCap = 'round';
    }

    brush.oninput = function () {
        context.lineCap = 'square';
    }

    pensize.oninput = function () {
        context.lineWidth = this.value;
    }

    color.oninput = function () {
        let farbe;
        farbe = this.value;
        context.strokeStyle = farbe;
        console.log("value" + context.strokeStyle);
    }

    const zeichne = () => {

        canvas.addEventListener('mousedown', e => {
            zeichnen = true;
            lastX = e.layerX;
            lastY = e.layerY;

            context.beginPath();
            context.moveTo(e.layerX, e.layerY);
            context.lineTo(e.layerX + 1, e.layerY + 1);
            context.stroke()
        });

        canvas.addEventListener('mousemove', e => {
            if (!zeichnen) return;
            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(e.layerX, e.layerY);
            context.stroke()

            lastX = e.layerX;
            lastY = e.layerY;
        });

        canvas.addEventListener('mouseup', function () {
            zeichnen = false;

        });
    }

    const init = () => {
        zeichne();
    }

    reset.addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });


    const reader = new FileReader();
    const img = new Image();

    const uploadImage = (e) => {
        reader.onload = () => {
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    imageLoader.addEventListener("change", uploadImage);

    // INIT
    init();
})