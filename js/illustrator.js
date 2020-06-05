/* Sobot Rimulator Electron GUI
 * Nome do módulo :     Illustrator
 * Ano de criação:      2020
 * Descrição do módulo: Módulo com funções de desenho em tag canvas
 * Versão:              1.0
 * Membros:             Lorena "Ino" Bassani
 */

/* Nome da função :     draw_rect
 * Intenção da função : desenhar retangulo em tag canvas
 * Pré-requisitos :     nenhum
 * Efeitos colaterais : desenha retangulo em região compreendida pela tag
 * Parâmetros :         context : canvas context :: 2d
 *                      x : coordenada x do ponto superior esquerdo
 *                      y : coordenada y do ponto superior esquerdo
 *                      l : largura
 *                      h : altura
 *                      color : cor a ser preenchida a figura
 *                      alpha (default = 1) : opacidade da linha
 * Retorno :            nenhum
 */ 
function draw_rect(context, x, y, l, h, color, alpha = 1){
    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = color;
    context.fillRect(x, y, l, h);
    context.closePath();
}

/* Nome da função :     stroke_rect
 * Intenção da função : contornar retangulo em tag canvas
 * Pré-requisitos :     nenhum
 * Efeitos colaterais : contorna retangulo em região compreendida pela tag
 * Parâmetros :         context : canvas context :: 2d
 *                      x : coordenada x do ponto superior esquerdo
 *                      y : coordenada y do ponto superior esquerdo
 *                      l : largura
 *                      h : altura
 *                      color : cor a ser preenchida a figura
 *                      lineWidth (default = 1) : grossura da linha
 *                      alpha (default = 1) : opacidade da linha
 * Retorno :            nenhum
 */
function stroke_rect(context, x, y, l, h, color, lineWidth = 1, alpha = 1){
    context.beginPath();
    context.globalAlpha = alpha;
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.strokeRect(x, y, l, h);
    context.closePath();
}

/* Nome da função :     draw_circle
 * Intenção da função : desenhar circulo em tag canvas
 * Pré-requisitos :     nenhum
 * Efeitos colaterais : desenha circulo em região compreendida pela tag
 * Parâmetros :         context : canvas context :: 2d
 *                      xc : coordenada x do centro
 *                      yc : coordenada y do centro
 *                      radius : raio do circulo
 *                      color : cor a ser preenchida a figura
 *                      alpha (default = 1) : opacidade da linha
 * Retorno :            nenhum
 */
function draw_circle(context, xc, yc, radius, color, alpha = 1){
    context.beginPath();
    context.fillStyle = color;
    context.globalAlpha = alpha;
    context.arc(xc, yc, radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}

/* Nome da função :     stroke_circle
 * Intenção da função : contornar circulo em tag canvas 
 * Pré-requisitos :     nenhum
 * Efeitos colaterais : contorna circulo em região compreendida pela tag
 * Parâmetros :         context : canvas context :: 2d
 *                      xc : coordenada x do centro
 *                      yc : coordenada y do centro
 *                      radius : raio do circulo
 *                      color : cor a ser preenchida a figura
 *                      lineWidth (default = 1) : grossura da linha
 *                      alpha (default = 1) : opacidade da linha
 * Retorno :            nenhum
 */
function stroke_circle(context, xc, yc, radius, color, lineWidth = 1, alpha = 1){
    context.beginPath();
    context.strokeStyle = color;
    context.globalAlpha = alpha;
    context.lineWidth = lineWidth;
    context.arc(xc, yc, radius, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
}

/* Nome da função :     draw_poly
 * Intenção da função : desenhar um poligono em tag canvas
 * Pré-requisitos :     nenhum
 * Efeitos colaterais : desenho de um poligono em região compreendida pela tag
 * Parâmetros:          context : canvas context :: 2d
 *                      poly : lista no formato [[x1, y1], [x2, y2], ... [xn, yn]] de vertices do poligono
 *                      color : cor a ser preenchida a figura
 *                      alpha (default = 1) : opacidade da linha
 * Retorno:             nenhum
 */
function draw_poly(context, poly, color, alpha = 1){
    if (poly.length <= 0) return;
    context.beginPath();
    context.globalAlpha = alpha;
    context.fillStyle = color;

    //Primeiro Ponto do poligono
    pontoAtual = poly[0];
    context.moveTo(pontoAtual[0], pontoAtual[1]);

    //Liga os pontos do poligono
    for (i = 1; i < poly.length; i++){
        pontoAtual = poly[i];
        context.lineTo(pontoAtual[0], pontoAtual[1]);
    }

    //Fecha o poligono
    pontoAtual = poly[0];
    context.lineTo(pontoAtual[0], pontoAtual[1]);

    context.fill();
    context.closePath();
}

/* Nome da função :     stroke_poly
 * Intenção da função : contornar um poligono em tag canvas
 * Pré-requisitos :     nenhum
 * Efeitos colaterais : contorna um poligono na região compreendida pela tag
 * Parâmetros :         context : canvas context :: 2d
 *                      poly : lista no formato [[x1, y1], [x2, y2], ... [xn, yn]] de vertices do poligono
 *                      color : cor a ser preenchida a figura
 *                      lineWidth (default = 1) : grossura da linha
 *                      alpha (default = 1) : opacidade da linha
 * Retorno :            nenhum
 */
function stroke_poly(context, poly, color, lineWidth = 1, alpha = 1){
    if (poly.length <= 0) return;
    context.beginPath();
    context.globalAlpha = alpha;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    //Primeiro Ponto do poligono
    pontoAtual = poly[0];
    context.moveTo(pontoAtual[0], pontoAtual[1]);

    //Liga os pontos do poligono
    for (i = 1; i < poly.length; i++){
        pontoAtual = poly[i];
        context.lineTo(pontoAtual[0], pontoAtual[1]);
    }

    //Fecha o poligono
    pontoAtual = poly[0];
    context.lineTo(pontoAtual[0], pontoAtual[1]);

    context.stroke();
    context.closePath();
}

/* Nome da função :     stroke_line
 * Intenção da função:  desenhar linha em tag canvas
 * Pré-requisitos:      nenhum
 * Efeitos colaterais:  desenha linha na região compreendida pela tag
 * Parâmetros:          context : canvas context :: 2d
 *                      xi : x do ponto inicial
 *                      yi : y do ponto inicial
 *                      xf : x do ponto final
 *                      yf : y do ponto final
 *                      color : cor a ser preenchida a figura
 *                      lineWidth (default = 1) : grossura da linha
 *                      alpha (default = 1) : opacidade da linha
 * Retorno:             nenhum
 */
function stroke_line(context, xi, yi, xf, yf, color, lineWidth = 1, alpha = 1){
    context.beginPath();
    context.globalAlpha = alpha;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.moveTo(xi, yi);
    context.lineTo(xf, yf);
    context.stroke();
    context.closePath();
}

function stroke_segmented_line(context, line, color, lineWidth = 1, alpha = 1){
    if (line.length <= 0) return;
    context.beginPath();
    context.globalAlpha = alpha;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    pontoAtual = line[0];
    context.moveTo(pontoAtual[0], pontoAtual[1]);

    //Liga os pontos do poligono
    for (i = 1; i < line.length; i++){
        pontoAtual = line[i];
        context.lineTo(pontoAtual[0], pontoAtual[1]);
    }
    
    context.stroke();
    context.closePath();
}

/* Exporta funções do módulo */
exports.stroke_poly = stroke_poly
exports.draw_poly = draw_poly
exports.stroke_rect = stroke_rect
exports.draw_rect = draw_rect
exports.stroke_circle = stroke_circle
exports.draw_circle = draw_circle
exports.stroke_line = stroke_line
exports.stroke_segmented_line = stroke_segmented_line