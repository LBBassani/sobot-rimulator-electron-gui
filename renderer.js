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
    stroke_circle(ctx, 12.5 + j * 25, 12.5 + i * 25, 10, strokeStyle, 1, 1 );
  }
}

//Turn transparency on
function draw_rect(context, x, y, l, h, color, alpha){
  context.beginPath();
  context.globalAlpha = alpha;
  context.fillStyle = color;
  context.fillRect(x, y, l, h);
  context.closePath();
}

function stroke_rect(context, x, y, l, h, color, lineWidth, alpha){
  context.beginPath();
  context.globalAlpha = alpha;
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.strokeRect(x, y, l, h);
  context.closePath();
}

function draw_circle(context, xc, yc, radius, color, alpha){
  context.beginPath();
  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.arc(xc, yc, radius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
}

function stroke_circle(context, xc, yc, radius, color, lineWidth, alpha){
  context.beginPath();
  context.strokeStyle = color;
  context.globalAlpha = alpha;
  context.lineWidth = lineWidth;
  context.arc(xc, yc, radius, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();
}

function stroke_line(context, xi, yi, xf, yf, color, lineWidth , alpha){
  context.beginPath();
  context.globalAlpha = alpha;
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.moveTo(xi, yi);
  context.lineTo(xf, yf);
  context.stroke();
  context.closePath();
}