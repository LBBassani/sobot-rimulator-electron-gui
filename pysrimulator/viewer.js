/* Sobot Rimulator Electron GUI
 * Nome do módulo :     Viewer
 * Ano de criação:      2020/06
 * Descrição do módulo: Módulo com funções de desenho do simulador em tag canvas
 * Versão:              1.0
 * Membros:             Lorena "Ino" Bassani
 */

class Viewer {

    /* Nome da função :    draw_frame
    * Intenção da função : desenhar uma frame em tag canvas
    * Pré-requisitos :     nenhum
    * Efeitos colaterais : desenha uma frame na região compreendida pela tag
    * Parâmetros :         canvas : canvas context :: 2d
    *                      frame : frame a ser desenhada
    * Retorno :            nenhum
    */
    static draw_frame(canvas, frame){
        frame_ctx = canvas.getContext("2d");
        frame_ctx.clearRect(- canvas.width/2 , - canvas.height/2, canvas.width, canvas.height);
        for ( let formas of frame ){
            let color = formas.color.split(" ").join("");
            if ( formas.type == "circle" ){
                illustrator.draw_circle(frame_ctx, formas.pos[0], formas.pos[1], formas.radius, color, formas.alpha );
            }else if ( formas.type == "polygons" ){
                for( let poly of formas.polygons ){
                illustrator.draw_poly(frame_ctx, poly, color, formas.alpha);
                }
            }else if ( formas.type == "lines" ){
                for ( let line of formas.lines ){
                    illustrator.stroke_segmented_line(frame_ctx, line, color, formas.linewidth, formas.alpha);
                }
            }else{
                console.log("Forma desconhecida")
            }
        }
    }

}

exports.Viewer = Viewer