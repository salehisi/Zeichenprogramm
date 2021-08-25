'use strict';
let imageURL, imageData, file;

function saveImageToDatabase(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'file', true);
    xhr.onload = function () {
        if (this.status == 200) {

            // const fd = new FormData;
            // fd.append('image', file);
            // $.ajax({
            //     type: "POST",
            //     url: "/bild",
            //     data: fd,
            //     processData: false,
            //     contentType: false
            // }).done(function () {
            //     console.log("saved")
            // });


            console.log(this.responseText)
        }
    }
    xhr.send();

}



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
    const canvas = document.querySelector('#canvas-wrapper');
    const context = canvas.getContext('2d');

    let heightRatio = 1;
    canvas.height = canvas.width * heightRatio;

    pencil.oninput = function () {
        context.lineCap = 'round';
    }

    brush.oninput = function () {
        context.lineCap = 'square';
    }

    pensize.oninput = function () {
        context.lineWidth = this.value;
        console.log(context.lineWidth);
    }
    color.oninput = function () {
        let farbe;
        farbe = this.value;
        context.strokeStyle = farbe;
        console.log("value" + context.strokeStyle);
        console.log(typeof farbe)
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
            //   context.beginPath();

        });

    }

    const init = () => {

        zeichne();
    }



    reset.addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    save.addEventListener("click", function () {
        // imageURL = canvas.toDataURL('./image/png');
        // imageData = imageURL.replace(/^data:image\/\w+;base64,/, "");
        // var image = canvas.toDataURL('./image/png').replace("image/octet-stream");
        // file = dataURLtoBlob(canvas.toDataURL('./image/png'));
        // saveImage(file);

        const image = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = image;
        link.download = "bild.png";
        link.click();


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


