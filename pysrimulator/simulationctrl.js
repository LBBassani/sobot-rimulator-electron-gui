
const viewer = require("./viewer");

// Variável de controle do simulador
var rimulator = false;
var is_running = false;
var running_simulation = null;
var zoom_min = 30
var zoom = 50
var zoom_max = 150;
var frame_canvas = document.getElementById("frame-canvas")
var frame_context = frame_canvas.getContext("2d")

function python_test ( pynode ){

    pynode.call("echo", "Testando", ( err, result ) => {
        if ( err ) return console.error( err );
        else return console.log(result);
    } );

}


function new_simulator ( pynode ) {

    // Chama a função new_rimulator (python)
    pynode.call( "new_rimulator", ( err, result ) => {
        if ( err ) return console.error( err );
        else return rimulator = result;
    } );
}

function initialize_sim( pynode, random = false ) {

    // Chama a função initialize_sim (python) e desenha a primeira frame na tela
    pynode.call( "initialize_sim", random , ( err, result ) => {
        if(err) return console.error(err);
        else return viewer.draw_frame(frame_canvas, result);
    } );

}

function play_sim( pynode ) {

    if (!is_running){
    
    // Chama a função play_sim (python)
    pynode.call( "play_sim", ( err, result ) => {
        if ( err ) return console.error( err );
        else return is_running = result;
    } );
    
    // Usa o periodo de simulação respondido por get_sim_period (python) para 
    // criar um intervalo de execução da função step_sim
    pynode.call( "get_sim_period", ( err, result ) => {
        if ( err ) return console.error( err );
        else return running_simulation = setInterval(() => step_sim(pynode, canvas), result*1000);
    } );

    step_sim(pynode, frame_canvas);

}

}

function pause_sim ( pynode ) {

    // Pausa apenas se estiver rodando
    if (is_running){

        let paused = false

        // Chama a função pause_sim do python
        pynode.call( "pause_sim", ( err, result ) => {
            if ( err ) return console.error( err );
            else return paused = result;
        } );

        clearInterval(running_simulation)
        is_running = false;

    }

}

function step_sim ( pynode , canvas) {

    // Chama a função step_sim (python) que anda um passo de simulação
    pynode.call( "step_sim", ( err, result ) => {
        if ( err ) return console.log( err );
        else return viewer.draw_frame(canvas, result);
    } );

}

function step_sim_once ( pynode , canvas ){

    pause_sim(pynode);
    step_sim(pynode, canvas);

}

function reset_sim ( pynode ) {

    pause_sim(pynode);
    initialize_sim(pynode);

}

function save_map ( pynode, filename ) {

    // Chama a função save_map (python)
    pynode.call("save_map", filename, ( err, result ) => {
        if ( err ) return console.error( err );
        else return console.log( "mapa salvo" );
    } );

}

function load_map ( pynode, filename ) {

    // Chama a função load_map (python) e reseta a simulação
    pynode.call("load_map", filename, ( err, result ) => {
        if ( err ) return console.error( err );
        else return reset_sim(pynode);
    } );

}

function random_map ( pynode ) {

    pause_sim(pynode);
    initialize_sim(pynode, true);

}

function draw_world ( pynode, canvas ) {
    
    // Chama função draw_world (python) e desenha o mundo na tela
    pynode.call("draw_world", (err, result) =>{
        if(err) return console.error(err);
        else return viewer.draw_frame(canvas, result);
    });

}

function add_robot ( pynode ) {

}

function get_robots ( pynode ) {

}

function delete_robot ( pynode ) {

}

function zoom_in ( pynode ) {

    set_zoom(zoom + 10);

}

function zoom_out ( pynode ) {

    set_zoom(zoom - 10);

}

function set_zoom ( zoom_valor ) {

    if (zoom_valor > zoom_min && zoom_valor < zoom_max ){
        frame_context.scale(1/zoom, 1/zoom);
        frame_context.scale(zoom_valor, zoom_valor);
        zoom = zoom_valor;
    }

}

exports.zoom_in = zoom_in
exports.zoom_out = zoom_out
exports.new_simulator = new_simulator
exports.draw_world = draw_world
exports.step_sim_once = step_sim_once
exports.initialize_sim = initialize_sim
exports.python_test = python_test
exports.play_sim = play_sim