
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

class SimulationControl {
    python_test ( pynode ){

        pynode.call("echo", "Testando", ( err, result ) => {
            if ( err ) return console.error( err );
            else return console.log(result);
        } );
    
    }
    
    
    new_simulator ( pynode ) {
    
        // Chama a função new_rimulator (python)
        pynode.call( "new_rimulator", ( err, result ) => {
            if ( err ) return console.error( err );
            else return rimulator = result;
        } );
    }
    
    initialize_sim( pynode, random = false ) {
    
        // Chama a função initialize_sim (python) e desenha a primeira frame na tela
        pynode.call( "initialize_sim", random , ( err, result ) => {
            if(err) return console.error(err);
            else return viewer.draw_frame(frame_canvas, result);
        } );
    
    }
    
    play_sim( pynode ) {
    
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
            else return running_simulation = setInterval(() => this.step_sim(pynode, canvas), result*1000);
        } );
    
        this.step_sim(pynode, frame_canvas);
    
    }
    
    }
    
    pause_sim ( pynode ) {
    
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
    
    step_sim ( pynode , canvas) {
    
        // Chama a função step_sim (python) que anda um passo de simulação
        pynode.call( "step_sim", ( err, result ) => {
            if ( err ) return console.log( err );
            else return viewer.draw_frame(canvas, result);
        } );
    
    }
    
    step_sim_once ( pynode , canvas ){
    
        this.pause_sim(pynode);
        this.step_sim(pynode, canvas);
    
    }
    
    reset_sim ( pynode ) {
    
        this.pause_sim(pynode);
        this.initialize_sim(pynode);
    
    }
    
    save_map ( pynode, filename ) {
    
        // Chama a função save_map (python)
        pynode.call("save_map", filename, ( err, result ) => {
            if ( err ) return console.error( err );
            else return console.log( "mapa salvo" );
        } );
    
    }
    
    load_map ( pynode, filename ) {
    
        // Chama a função load_map (python) e reseta a simulação
        pynode.call("load_map", filename, ( err, result ) => {
            if ( err ) return console.error( err );
            else return this.reset_sim(pynode);
        } );
    
    }
    
    random_map ( pynode ) {
    
        this.pause_sim(pynode);
        this.initialize_sim(pynode, true);
    
    }
    
    draw_world ( pynode, canvas ) {
        
        // Chama função draw_world (python) e desenha o mundo na tela
        pynode.call("draw_world", (err, result) =>{
            if(err) return console.error(err);
            else return viewer.draw_frame(canvas, result);
        });
    
    }
    
    add_robot ( pynode ) {
    
    }
    
    get_robots ( pynode ) {
    
    }
    
    delete_robot ( pynode ) {
    
    }

    set_zoom ( zoom_valor ) {
    
        if (zoom_valor > zoom_min && zoom_valor < zoom_max ){
            frame_context.scale(1/zoom, 1/zoom);
            frame_context.scale(zoom_valor, zoom_valor);
            zoom = zoom_valor;
        }
    
    }
    
    zoom_in ( ) {
    
        this.set_zoom(zoom + 10);
    
    }
    
    zoom_out ( ) {
    
        this.set_zoom(zoom - 10);
    
    }
}

exports.SimulationControl = SimulationControl