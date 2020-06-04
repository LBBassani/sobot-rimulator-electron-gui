const illustrator = require("./js/illustrator.js")

const pynode = require('@fridgerator/pynode')
pynode.dlOpen('libpython3.7.so')
pynode.startInterpreter()
pynode.appendSysPath('./pysrimulator/')
pynode.openFile('api')
pynode.call('echo', "Eu chamei uma função Python!!!!!", (err, result) => {
    if (err) return console.log('error : ', err)
    else return replaceText('img-canvas',result) // true
  })

const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    var ctx = element.getContext("2d")
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(text, 75, 10);
}

// Desenhando no canva

var c = document.getElementById("img-canvas");
var ctx = c.getContext("2d");
ctx.translate(50, 0);


for (let i = 1; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    strokeStyle = `rgb(
        0,
        ${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)})`;
    illustrator.stroke_circle(ctx, 12.5 + j * 25, 12.5 + i * 25, 10, strokeStyle, 1, 1 );
  }
}

illustrator.stroke_poly(ctx, [[10.5,20], [50.5, 3.4], [70.0, 45.5], [120, 70], [79, 29]], "red");
illustrator.draw_poly(ctx, [[20.6, 40], [50, 50], [64, 78]], "red");