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
function draw_rect(context, x, y, l, h, color, alpha = 1){
  context.beginPath();
  context.globalAlpha = alpha;
  context.fillStyle = color;
  context.fillRect(x, y, l, h);
  context.closePath();
}

function stroke_rect(context, x, y, l, h, color, lineWidth = 1, alpha = 1){
  context.beginPath();
  context.globalAlpha = alpha;
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.strokeRect(x, y, l, h);
  context.closePath();
}

function draw_circle(context, xc, yc, radius, color, alpha = 1){
  context.beginPath();
  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.arc(xc, yc, radius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
}

function stroke_circle(context, xc, yc, radius, color, lineWidth = 1, alpha = 1){
  context.beginPath();
  context.strokeStyle = color;
  context.globalAlpha = alpha;
  context.lineWidth = lineWidth;
  context.arc(xc, yc, radius, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();
}

function draw_poly(context, poly, color, alpha = 1){
  if (poly.length <= 0) return;
  context.beginPath();
  context.globalAlpha = alpha;
  context.fillStyle = color;

  //Primeiro Ponto do poligono
  pontoAtual = poly[0];
  context.moveTo(pontoAtual[0], pontoAtual[1]);

  //Liga os pontos do poligono
  for (i = 1; i < poly.length; i++){
    pontoAtual = poly[i];
    context.lineTo(pontoAtual[0], pontoAtual[1]);
  }

  //Fecha o poligono
  pontoAtual = poly[0];
  context.lineTo(pontoAtual[0], pontoAtual[1]);

  context.fill();
  context.closePath();
}

function stroke_poly(context, poly, color, lineWidth = 1, alpha = 1){
  if (poly.length <= 0) return;
  context.beginPath();
  context.globalAlpha = alpha;
  context.strokeStyle = color;
  context.lineWidth = lineWidth;

  //Primeiro Ponto do poligono
  pontoAtual = poly[0];
  context.moveTo(pontoAtual[0], pontoAtual[1]);

  //Liga os pontos do poligono
  for (i = 1; i < poly.length; i++){
    pontoAtual = poly[i];
    context.lineTo(pontoAtual[0], pontoAtual[1]);
  }

  //Fecha o poligono
  pontoAtual = poly[0];
  context.lineTo(pontoAtual[0], pontoAtual[1]);

  context.stroke();
  context.closePath();
}

function stroke_line(context, xi, yi, xf, yf, color, lineWidth = 1, alpha = 1){
  context.beginPath();
  context.globalAlpha = alpha;
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.moveTo(xi, yi);
  context.lineTo(xf, yf);
  context.stroke();
  context.closePath();
}

stroke_poly(ctx, [[10.5,20], [50.5, 3.4], [70.0, 45.5], [120, 70], [79, 29]], "red");
draw_poly(ctx, [[20.6, 40], [50, 50], [64, 78]], "red");