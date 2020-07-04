
/* Importa módulos e classes */
var axios = require("axios")
const {Illustrator} = require("./pysrimulator/illustrator.js");
const {SimulationControl} = require("./pysrimulator/simulationctrl");

// Abre arquivo api do pysrimulator e ganha acesso as funções (python) nele

// Variável de controle do simulador
var rimulator = false;
var controller = new SimulationControl()
// var illustrator = new Illustrator()

/* Definições de funções */

// Chama função python echo para testar a integração python-node via axios
/* function pyEcho(echo, replace_id){
    let url = "http://localhost:4003/jsonrpc"
    let request = {
      "method" : "echo",
      "params" : [echo],
      "jsonrpc" : "2.0",
      "id" : 0,
    }

    axios.post(this.url, request).then(
      function(response){
          replaceText(replace_id, response["data"]["result"])
      }
  )

} */

// Função que substitui o texto na tela
/* const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
} */

// Função que desenha nova frame na tela
/* function new_frame(axios, canvas){
  if (rimulator) {
    pyEcho("Rodando simulação", "py-estado");
    controller.step_sim_once(axios, canvas)
  }else{
    pyEcho("Criando nova simulação", "py-estado");
    controller.new_simulator(axios)
    rimulator = true
  }
}
 */
/* Script sendo executado pelo arquivo */

// Anuncia o teste
// pyEcho("Testando controle de simulação", "title-pyteste");

// Abre o canvas em contexto 2d, translada o ponto ( 0, 0 ) para o centro do canvas e aplica zoom
var canvas = document.getElementById("frame-canvas");
var frame_ctx = canvas.getContext("2d");
frame_ctx.translate(canvas.width/2,canvas.height/2);
frame_ctx.scale(50, 50);

// Desenha diversos circulos com gradiente no canvas aberto
/* for (let i = 1; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    strokeStyle = `rgb(
        0,
        ${Math.floor(255 - 42.5 * i)},
        ${Math.floor(255 - 42.5 * j)})`;
    Illustrator.stroke_circle(frame_ctx, 12.5 + j * 25, 12.5 + i * 25, 10, strokeStyle, 1, 1 );
  }
} */

controller.new_simulator(axios);
controller.draw_world(axios, canvas);


// Conecta o teste ao botão de teste
botao = document.getElementById("button-pyteste");
botao.addEventListener("click", () => {
  //pyEcho("Adicionando novo robô", "py-estado");
  controller.add_robot(axios, canvas);} );
//botao.addEventListener("click", () => new_frame(axios, canvas))

botao = document.getElementById("play-sim");
botao.addEventListener("click", () => controller.play_sim(axios, canvas));

botao = document.getElementById("stop-sim");
botao.addEventListener("click", () => controller.pause_sim(axios));

botao = document.getElementById("step-sim");
botao.addEventListener("click", () => controller.step_sim_once(axios, canvas));

botao = document.getElementById("reset-sim");
botao.addEventListener("click", () => controller.reset_sim(axios, canvas));

botao = document.getElementById("zoom-in");
botao.addEventListener("click", () => controller.zoom_in(axios, canvas));

botao = document.getElementById("zoom-out");
botao.addEventListener("click", () => controller.zoom_out(axios, canvas));