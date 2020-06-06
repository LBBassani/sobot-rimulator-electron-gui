
/* Importa módulos e classes */
const pynode = require('@fridgerator/pynode');
const {Illustrator} = require("./pysrimulator/illustrator.js");
const {SimulationControl} = require("./pysrimulator/simulationctrl");

// Abre arquivo api do pysrimulator e ganha acesso as funções (python) nele

pynode.startInterpreter();
pynode.appendSysPath('./pysrimulator/');
pynode.openFile('api');

// Variável de controle do simulador
var rimulator = false;
var controller = new SimulationControl()
var illustrator = new Illustrator()

/* Definições de funções */

// Chama função python echo para testar a integração python-node via PyNode
function pyEcho(echo, replace_id){
  pynode.call('echo', echo, (err, result) => {
      if (err) return console.log('error : ', err)
      else return replaceText(replace_id, result) // true
  })
}

// Função que substitui o texto na tela
const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
}

// Função que desenha nova frame na tela
function new_frame(pynode, canvas){
  if (rimulator) {
    pyEcho("Rodando simulação", "py-estado");
    controller.step_sim_once(pynode, canvas)
  }else{
    pyEcho("Criando nova simulação", "py-estado");
    controller.new_simulator(pynode)
    rimulator = true
  }
}

/* Script sendo executado pelo arquivo */

// Anuncia o teste
pyEcho("Desenhando frame de simulação", "title-pyteste");

// Abre o canvas em contexto 2d, translada o ponto ( 0, 0 ) para o centro do canvas e aplica zoom
var canvas = document.getElementById("frame-canvas");
var frame_ctx = canvas.getContext("2d");
frame_ctx.translate(canvas.width/2,canvas.height/2);

// Desenha diversos circulos com gradiente no canvas aberto
for (let i = 1; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    strokeStyle = `rgb(
        0,
        ${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)})`;
    illustrator.stroke_circle(frame_ctx, 12.5 + j * 25, 12.5 + i * 25, 10, strokeStyle, 1, 1 );
  }
}

controller.new_simulator(pynode)

frame_ctx.scale(50, 50);

// Conecta o teste ao botão de teste
botao = document.getElementById("button-pyteste");
botao.addEventListener("click", () => controller.play_sim(pynode, canvas));

botao = document.getElementById("zoom-in");
botao.addEventListener("click", () => controller.zoom_in(canvas));

botao = document.getElementById("zoom-out");
botao.addEventListener("click", () => controller.zoom_out(canvas));