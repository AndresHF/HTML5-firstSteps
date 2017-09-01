//JavaScript documents

var canvasMatrix;
var c3;
var startMatrix;
var loopMatrix;

var lettersHead = [];
var numLettersHead = 44;

function loadCanvasMatrix(){
    
    canvasMatrix = document.getElementById("canvasMatrix");
    canvasMatrix.width = 850;
    canvasMatrix.height= 500;
    startMatrix = document.getElementById("comienzaMatrix");
    canvasMatrix.style.backgroundColor = "black";
    
    c3 = canvasMatrix.getContext("2d");
    c3.font = "normal 16px monospace";
    c3.shadowBlur = 50;
    c3.shadowOffsetX = 10;
    c3.shadowOffsetY = 30;
    
    for(var x = 0; x < numLettersHead; x++){
        var tailLength = Math.floor(Math.random()*15)+15;
        lettersHead.push(new LetterHead());
        lettersHead[x].posX = x * 19;
        for(var y = 0; y < tailLength; y++){
            lettersHead[x].lettersTail.push(new LetterHead());
            lettersHead[x].lettersTail[y].posX = lettersHead[x].posX; 
            lettersHead[x].lettersTail[y].posY = lettersHead[x].posY - (y * 20) - 20;
        }
        
    }
    
    startMatrix.addEventListener("click", launchMatrix, false);
}
function launchMatrix(){
    
    if(startMatrix.value == "Start"){
        startMatrix.value = "Stop";
        loopMatrix = setInterval(matrixDraw, 30);
    }else{
        startMatrix.value = "Start";
        clearInterval(loopMatrix);
    }
}
function matrixDraw(){
    c3.clearRect(0, 0, canvasMatrix.width, canvasMatrix.height);
    for(var i in lettersHead){
        lettersHead[i].updateLetterY();
        lettersHead[i].letterEdges();
        lettersHead[i].letterChange();
        lettersHead[i].show_update_Tail();
    }

}    

function LetterHead(){
    
    this.posX = 400;
    this.posY = Math.floor(Math.random()*-100)-50;
    this.letterCode = Math.floor(Math.random()*97)+0x30A0;
    this.letterYspeed = Math.floor(Math.random()*7)+3;
    this.letter = String.fromCharCode(this.letterCode);

    this.lettersTail = [];
    

    this.updateLetterY = function(){
        this.posY += this.letterYspeed;
    }
    this.letterEdges = function(){
        if(this.posY > canvasMatrix.height + 20){
            this.posY  = Math.floor(Math.random()*-200)-100;
        }
    }
    this.letterChange = function(){
        
        var random = Math.floor(Math.random()*101);
        if(random > 98){
            this.letterCode = Math.floor(Math.random()*97)+0x30A0;
            this.letter = String.fromCharCode(this.letterCode);
        }
        
    }
    this.show_update_Tail = function(){
        var tailAlpha = 1;
        c3.fillStyle = "rgba(250,250,250,1)";
        c3.fillText(this.letter, this.posX, this.posY);
        for(var i in this.lettersTail){ 
            this.lettersTail[i].posY += this.letterYspeed;
            this.lettersTail[i].letterChange();
            c3.fillStyle = "rgba(0,255,0,"+tailAlpha+")";
            c3.shadowColor = "rgba(0,255,0,"+tailAlpha+")";
            c3.fillText(this.lettersTail[i].letter,this.posX, this.lettersTail[i].posY);
            tailAlpha -= 0.04;
            if(this.lettersTail[i].posY > canvasMatrix.height + 20){
                this.lettersTail[i].posY = this.posY - (i * 20) - 20;
            }
        }
    }
    
}










