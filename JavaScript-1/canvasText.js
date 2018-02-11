//JavaScript documents

var canvas;
var c0;
var contenedor;
var texto = "";
var input;
var palabras = [];
var counter = 0;
var r = 0;
var g = 0;
var b = 0;
var ajusteX;

function loadCanvas(){
    canvas = document.getElementById("efectoTexto");
    contenedor = document.getElementById("contenedorCanvas");
    input = document.getElementById("texto");
    texto = input.value;
    ajusteX = Math.floor(texto.length / 2) * 60;
    
    canvas.width = 850;
    canvas.height = 420;
    
    canvas.style.backgroundColor = "rgba(0, 0 , 0, 1)";
    
    c0 = canvas.getContext("2d");
    c0.strokeStyle = "rgb(0,0,0)";
    c0.font = "100px monospace";
    c0.globalAlpha = 1;
    
    
    canvas.addEventListener("click", cambiaSentido, false);
    canvas.addEventListener("mousemove", efectoTexto, false);

}

function palabra(){

    var posX = event.pageX - contenedor.offsetLeft;
    var posY = event.pageY;

    var rMapped = Math.floor(posX * 0.8);
    var gMapped = Math.floor(posY * 0.9);
    if(rMapped > 255){
        rMapped = 255;
    }
    if(gMapped > 255){
        gMapped = 255;
    }
    
    texto = input.value;
    this.show = function(){
        c0.fillStyle = "rgb("+rMapped+","+gMapped+","+b+")";
        if(texto == "circulo"){
            c0.beginPath();
            c0.arc(posX, posY,25,0,2*Math.PI);
            c0.fill();
            c0.stroke();
        }else if(texto == "cuadrado"){
            c0.fillRect(posX, posY, 50, 50);
            c0.strokeRect(posX, posY, 50, 50);
        }else{
            c0.fillText(texto, posX - ajusteX, posY);
            c0.strokeText(texto, posX - ajusteX, posY);  
        }
    
     
    }
}
function cambiaSentido(){
    if(counter == 0){
        b = 150;
    }else if(counter == 1){
        b = 200;
        
    }else if(counter == 2){
        b = 255;
    }else if( counter == 3){
        b = 0;
    }
    if(counter > 3){
        counter = 0;
    }
    counter++;
}

function efectoTexto(){
    
    palabras.push(new palabra());

    c0.clearRect(0,0,canvas.width, canvas.height);
    if(counter % 2 == 0){
        for(var i = 0; i < palabras.length; i++){
            palabras[i].show();
        }

    }else{
        for(var i = palabras.length-1; i>= 0 ; i--){
            palabras[i].show();
        }
    }
   
    if(palabras.length > 50){
        palabras.splice(0,1);
    }

}


//window.onload = loadCanvas;








