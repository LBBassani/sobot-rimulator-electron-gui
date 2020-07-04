
const {Viewer} = require("./viewer")

class SimulationControl {
    // Variável de controle do simulador
    rimulator = false
    is_running = false
    running_simulation = null
    zoom_min = 30
    zoom = 50
    zoom_max = 150
    url = "http://localhost:4003/jsonrpc"
    
    python_test ( axios ){

        let request = {
            "method" : "echo",
            "params" : ["server test"],
            "jsonrpc" : "2.0",
            "id" : 0,
        }
        
        axios.post(this.url, request).then(
            function(response){
                return response["data"]["result"]
            }
        )
        
    }
    
    
    new_simulator ( axios ) {
        
        // Chama a função new_rimulator (python)
        let request = {
            "method" : "new_rimulator",
            "params" : [ ],
            "jsonrpc" : "2.0",
            "id" : 0,
        }
        
        this.rimulator = axios.post(this.url, request).then(
            function(response){
                return response["data"]["result"]
            }
        )
    }
    
    initialize_sim( axios, canvas, random = false ) {
        
        // Chama a função initialize_sim (python) e desenha a primeira frame na tela
        let request = {
            "method" : "initialize_sim",
            "params" : [random],
            "jsonrpc" : "2.0",
            "id" : 0,
        }
        
        axios.post(this.url, request).then(
            function(response){
                return Viewer.draw_frame(canvas, response["data"]["result"])
            } )
        
    }
    
    play_sim( axios, canvas ) {
        
        if (!this.is_running){
            
            // Chama a função play_sim (python)

            let request = {
                "method" : "play_sim",
                "params" : [],
                "jsonrpc" : "2.0",
                "id" : 0,
            }
            
            this.is_running = axios.post(this.url, request).then(
                function(response){
                    return response["data"]["result"]
                }
            )
            
            // Usa o periodo de simulação respondido por get_sim_period (python) para 
            // criar um intervalo de execução da função step_sim
            request = {
                "method" : "get_sim_period",
                "params" : [ ],
                "jsonrpc" : "2.0",
                "id" : 0,
            }
            
            this.running_simulation = setInterval(() => this.step_sim(axios, canvas), axios.post(this.url, request).then(
                function(response){
                    return response["data"]["result"]*3000
                }
            ))
            
            this.step_sim(axios, canvas)
            
        }
        
    }
    
    pause_sim ( axios ) {
        
        // Pausa apenas se estiver rodando
        if (this.is_running){
            
            let paused = false
            
            // Chama a função pause_sim do python
            let request = {
                "method" : "pause_sim",
                "params" : [],
                "jsonrpc" : "2.0",
                "id" : 0,
            }
            
            this.paused = axios.post(this.url, request).then(
                function(response){
                    return response["data"]["result"]
                }
            )
            
            clearInterval(this.running_simulation)
            this.is_running = false
            
        }
        
    }
    
    step_sim ( axios , canvas) {
        
        // Chama a função step_sim (python) que anda um passo de simulação
        let request = {
            "method" : "step_sim",
            "params" : [],
            "jsonrpc" : "2.0",
            "id" : 0,
        }
        
        axios.post(this.url, request).then(
            function(response){
                return Viewer.draw_frame(canvas, response["data"]["result"])
            } )
        
    }
    
    step_sim_once ( axios , canvas ){
        
        this.pause_sim(axios)
        this.step_sim(axios, canvas)
        
    }
    
    reset_sim ( axios, canvas ) {
        
        this.pause_sim(axios)
        this.initialize_sim(axios, canvas)
        
    }
    
    save_map ( axios, filename ) {
        
        // Chama a função save_map (python)
        let request = {
            "method" : "save_map",
            "params" : [filename],
            "jsonrpc" : "2.0",
            "id" : 0,
        }
        
        axios.post(this.url, request).then(
            function(_){
                console.log( "mapa salvo" )
            }
        )
        
    }
    
    load_map ( axios, filename ) {
        
        // Chama a função load_map (python) e reseta a simulação
        let request = {
            "method" : "load_map",
            "params" : [filename],
            "jsonrpc" : "2.0",
            "id" : 0,
        }
        
        axios.post(this.url, request).then(
            this.reset_sim(axios)
        )
        
    }
    
    random_map ( axios ) {
        
        this.pause_sim(axios)
        this.initialize_sim(axios, true)
        
    }
    
    draw_world ( axios, canvas ) {
        
        // Chama função draw_world (python) e desenha o mundo na tela
        let request = {
            "method" : "draw_world",
            "params" : [],
            "jsonrpc" : "2.0",
            "id" : 0,
        }
        
        axios.post(this.url, request).then(
            function(response){
                return Viewer.draw_frame(canvas, response["data"]["result"])
            } )
        
    }
    
    add_robot ( axios , canvas ) {

        let request = {
            "method" : "add_robot",
            "params" : ["khepera3", [0 , 0]],
            "jsonrpc" : "2.0",
            "id" : 0,
        }
        
        axios.post(this.url, request).then(
            function(_){
                console.log("Robo adicionado")
            }
        )

        this.reset_sim(axios, canvas)
        
    }
    
    get_robots ( axios ) {
        
    }
    
    delete_robot ( axios ) {
        
    }
    
    set_zoom ( axios,  zoom_valor , canvas ) {
        
        if (zoom_valor > this.zoom_min && zoom_valor < this.zoom_max ){
            let frame_context = canvas.getContext("2d")
            frame_context.scale(1/this.zoom, 1/this.zoom)
            frame_context.scale(zoom_valor, zoom_valor)
            this.zoom = zoom_valor
        }

        this.draw_world(axios, canvas)
        
    }
    
    zoom_in ( axios, canvas ) {
        
        this.set_zoom(axios, this.zoom + 10, canvas)
        
    }
    
    zoom_out ( axios, canvas) {
        
        this.set_zoom(axios, this.zoom - 10, canvas)
        
    }
}

exports.SimulationControl = SimulationControl