const illustrator = require("./js/illustrator.js")
const pynode = require('@fridgerator/pynode')

// Abre arquivo api do pysrimulator e ganha acesso as funções (python) nele
pynode.dlOpen('libpython3.7.so')
pynode.startInterpreter()
pynode.appendSysPath('./pysrimulator/')
pynode.openFile('api')

// Chama função python echo para testar a integração python-node via PyNode
pynode.call('echo', "Eu chamei uma função Python!!!!!", (err, result) => {
    if (err) return console.log('error : ', err)
    else return replaceText('img-canvas',result) // true
  })

// Função que substitui o texto na tela
const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    var ctx = element.getContext("2d")
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(text, 75, 10);
}

// Desenhando no canvas
var c = document.getElementById("img-canvas");
var ctx = c.getContext("2d");
ctx.translate(50, 0);

// Desenha diversos circulos com gradiente
for (let i = 1; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    strokeStyle = `rgb(
        0,
        ${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)})`;
    illustrator.stroke_circle(ctx, 12.5 + j * 25, 12.5 + i * 25, 10, strokeStyle, 1, 1 );
  }
}
