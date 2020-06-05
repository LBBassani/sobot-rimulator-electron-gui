const illustrator = require("./js/illustrator.js")
const pynode = require('@fridgerator/pynode')

// Abre arquivo api do pysrimulator e ganha acesso as funções (python) nele
pynode.startInterpreter()
pynode.dlOpen('libpython3.7.so')
pynode.startInterpreter()
pynode.appendSysPath('./pysrimulator/')
pynode.openFile('api')

// Chama função python echo para testar a integração python-node via PyNode
function pyEcho(echo, replace_id){
pynode.call('echo', echo, (err, result) => {
    if (err) return console.log('error : ', err)
    else return replaceText(replace_id, result) // true
})
}

pyEcho("Desenhando frame de simulação", "title-pyteste");

// Função que substitui o texto na tela
const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
}

// Desenhando no canvas
var canvas = document.getElementById("img-canvas");
var frame_ctx = canvas.getContext("2d");
frame_ctx.translate(canvas.width/2,canvas.height/2);
frame_ctx.scale(100, 100);

// Desenha diversos circulos com gradiente
for (let i = 1; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    strokeStyle = `rgb(
        0,
        ${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)})`;
    illustrator.stroke_circle(frame_ctx, 12.5 + j * 25, 12.5 + i * 25, 10, strokeStyle, 1, 1 );
  }
}

var rimulator = false;

function new_frame(){
  console.log(rimulator)
  if (rimulator) {
    pyEcho("Recebendo frame", "py-estado");
    pynode.call("get_frame", (err, result) =>{
      if(err) return console.error(err);
      else return draw_frame(result);
    });
  }else{
    pyEcho("Criando nova simulação", "py-estado");
    pynode.call("new_rimulator", (err, result)=>{
      if (err) return console.error(err);
      else return rimulator = result;
    } );
  }
}

botao = document.getElementById("button-pyteste");
botao.addEventListener("click", new_frame);

function draw_frame(frame){
  console.log(frame);
  frame_ctx.clearRect(- canvas.width/2 , - canvas.height/2, canvas.width, canvas.height);
  for ( let formas of frame ){
    if ( formas.type == "circle" ){
      // TODO : imprime circulo
      illustrator.draw_circle(frame_ctx, formas.pos[0], formas.pos[1], formas.radius, formas.fontcolor, formas.alpha );
    }else if ( formas.type == "polygons" ){
      // TODO : imprimir poligonos
      for( let poly of formas.polygons ){
        illustrator.draw_poly(frame_ctx, poly, formas.color, formas.alpha);
      }
    }else if ( formas.type == "lines" ){
      // TODO : imprimir linhas
      for ( let line of formas.lines ){
          illustrator.stroke_segmented_line(frame_ctx, line, formas.color, formas.linewidth, formas.alpha);
      }
    }else{
      console.log("Forma desconhecida")
    }
  }
}