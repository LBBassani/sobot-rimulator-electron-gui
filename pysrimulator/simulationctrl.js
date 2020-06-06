
const viewer = require("./viewer");

class SimulationControl {
    // Variável de controle do simulador
    rimulator = false;
    is_running = false;
    running_simulation = null;
    zoom_min = 30;
    zoom = 50;
    zoom_max = 150;
    
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
            else return this.rimulator = result;
        } );
    }
    
    initialize_sim( pynode, canvas, random = false ) {
        
        // Chama a função initialize_sim (python) e desenha a primeira frame na tela
        pynode.call( "initialize_sim", random , ( err, result ) => {
            if(err) return console.error(err);
            else return viewer.draw_frame(canvas, result);
        } );
        
    }
    
    play_sim( pynode, canvas ) {
        
        if (!this.is_running){
            
            // Chama a função play_sim (python)
            pynode.call( "play_sim", ( err, result ) => {
                if ( err ) return console.error( err );
                else return this.is_running = result;
            } );
            
            // Usa o periodo de simulação respondido por get_sim_period (python) para 
            // criar um intervalo de execução da função step_sim
            pynode.call( "get_sim_period", ( err, result ) => {
                if ( err ) return console.error( err );
                else return this.running_simulation = setInterval(() => this.step_sim(pynode, canvas), result*1000);
            } );
            
            this.step_sim(pynode, canvas);
            
        }
        
    }
    
    pause_sim ( pynode ) {
        
        // Pausa apenas se estiver rodando
        if (this.is_running){
            
            let paused = false
            
            // Chama a função pause_sim do python
            pynode.call( "pause_sim", ( err, result ) => {
                if ( err ) return console.error( err );
                else return paused = result;
            } );
            
            clearInterval(this.running_simulation)
            this.is_running = false;
            
        }
        
    }
    
    step_sim ( pynode , canvas) {
        
        // Chama a função step_sim (python) que anda um passo de simulação
        pynode.call( "step_sim", ( err, result ) => {
            if ( err ) return console.error( err );
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
    
    set_zoom ( zoom_valor , canvas ) {
        
        if (zoom_valor > this.zoom_min && zoom_valor < this.zoom_max ){
            let frame_context = canvas.getContext("2d");
            frame_context.scale(1/this.zoom, 1/this.zoom);
            frame_context.scale(zoom_valor, zoom_valor);
            this.zoom = zoom_valor;
        }
        
    }
    
    zoom_in ( canvas ) {
        
        this.set_zoom(this.zoom + 10, canvas);
        
    }
    
    zoom_out ( canvas) {
        
        this.set_zoom(this.zoom - 10, canvas);
        
    }
}

exports.SimulationControl = SimulationControl