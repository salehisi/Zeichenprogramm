'use strict';

document.addEventListener('DOMContentLoaded', event => {
    let lastX, lastY;
    let zeichnen = false;
    const pencil = document.querySelector('#pen-pencil');
    const brush = document.querySelector('#pen-brush');
    const pensize = document.querySelector('#pen-size');
    const color = document.querySelector('#pen-color');
    const reset = document.querySelector('#reset');
    const save = document.querySelector('#save');
    const load = document.querySelector('#load');
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


    // const zeichneSterne = () => {
    //     canvas.addEventListener('mousedown', e => {
    //         console.log(context.strokeStyle);
    //         context.beginPath();
    //         context.moveTo(e.layerX, e.layerY);
    //         context.lineTo(e.layerX, e.layerY);
    //         context.stroke()
    //         lastX = e.layerX;
    //         lastY = e.layerY;
    //     });

    //     canvas.addEventListener('mousemove', e => {

    //         console.log(e.layerX, e.layerY);
    //         context.beginPath();
    //         context.moveTo(lastX, lastY);
    //         context.lineTo(e.layerX, e.layerY);
    //         context.stroke()
    //     });

    //     canvas.addEventListener('mouseup', function () {


    //     });

    const init = () => {

        zeichne();
    }



    reset.addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    save.addEventListener("click", function () {
        saveCanvas(canvas, "sketch", "png");
    });

    load.addEventListener("click", function () {

    });



    // INIT
    init();
})

