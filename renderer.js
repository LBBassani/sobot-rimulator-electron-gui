const pynode = require('@fridgerator/pynode')
pynode.dlOpen('libpython3.7.so')
pynode.startInterpreter()
pynode.appendSysPath('./pysrimulator/')
pynode.openFile('api')
pynode.call('echo', "Eu chamei uma função Python!!!!!", (err, result) => {
    if (err) return console.log('error : ', err)
    else return replaceText('text-canvas',result) // true
  })

const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    var ctx = element.getContext("2d")
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(text, element.width/2, element.height/2);
}

// Desenhando no canva

var c = document.getElementById("img-canvas");
var ctx = c.getContext("2d");
ctx.translate(50, 0);
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 75, 50);
//Turn transparency on
ctx.globalAlpha = 0.2;
ctx.fillStyle = "blue";
ctx.fillRect(30, 30, 75, 50);
ctx.fillStyle = "green";
ctx.fillRect(60, 60, 75, 50);
ctx.fillStyle = "purple";
ctx.globalAlpha = 0.5;
ctx.arc(70, 55, 50, 0, 2 * Math.PI);
ctx.fill();
ctx.fillStyle = "black";