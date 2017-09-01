//JavaScript documents

var canvas2;
var c;
var pelota;
var comenzar;
var reset;
var img;
var loop;
var rangeX;
var rangeY;
var kick;
var kicked = false;
var pelotas = [];
var numPelotas = 2;
var counter = 0;
var booleanTime = true;

function loadCanvas2(){
    canvas2 = document.getElementById("canvasPelota");
    canvas2.width = 850;
    canvas2.height = 600;
    canvas2.style.backgroundColor = "rgba(0, 0 , 0, 1 )";
    
    comenzar = document.getElementById("comenzar");
    kick = document.getElementById("kick");
    reset = document.getElementById("reset");
    rangeX = document.getElementById("xspeed");
    rangeY = document.getElementById("yspeed");
    
    c = canvas2.getContext("2d");
    
    img = new Image();
    img.src="pelota.png";

    for(var i = 0; i < numPelotas; i++){
        pelotas.push(new Pelota());
    }
    
    comenzar.addEventListener("click", init, false);
    kick.addEventListener("click", setKicked, false);
    reset.addEventListener("click", resetBalones, false);

}
function setKicked(){
    kicked = true;

}
function init(){
    if(comenzar.value == "Start"){
        comenzar.value = "Stop";
        loop = setInterval(draw,30);
    }else if(comenzar.value == "Stop"){
        comenzar.value = "Start";
        clearInterval(loop);
    }
    
}
function resetBalones(){
    for(var i in pelotas){
        pelotas[i].xspeed = 0;
        pelotas[i].yspeed = 0;
        pelotas[i].posX = 50*(i+1);
        pelotas[i].posY = 200;
    }
}
function draw(){
    counter++;
    c.clearRect(0,0,canvas2.width, canvas2.height);
    
    for(var i in pelotas){
        pelotas[i].applyFriction();
        pelotas[i].applyForce();
        pelotas[i].edges(); 
        pelotas[i].show();
        pelotas[i].kick();
    }
    for(var x = 0; x < pelotas.length; x++){
        for(var y = x + 1; y < pelotas.length; y++){
            pelotas[x].updateCenter();
            pelotas[y].updateCenter();
            pelotas[x].checkColision(pelotas[y]);
        }
    }
    if(counter > 10){
        booleanTime = true;
        counter = 0;
    }
}

function Pelota(){
    this.posX = Math.floor(Math.random()*(canvas2.width-101))+1;
    this.posY = 10;
    this.yspeed = 0;
    this.xspeed = Math.floor(Math.random()*40)-20;
    this.gravity = 5;
    this.maxSpeed = 100;
    this.friction = 0.6;
    this.centerX = this.posX + 50;
    this.centerY = this.posY + 50;

    this.checkColision = function(other){
        if(booleanTime){
            var d = Math.floor(Math.sqrt(Math.pow(other.centerX - this.centerX,2) + 
                                         Math.pow(other.centerY - this.centerY,2)));
            if(d <= 100){
                booleanTime = false;
                var temp = this.xspeed;
                var temp2 = this.yspeed;
                this.xspeed = (this.xspeed * -0.1) + other.xspeed * 0.9  + other.yspeed * 0.2;
                this.yspeed = (this.yspeed * -0.1) + other.yspeed * 0.9  + other.xspeed * 0.2;
                other.xspeed = temp * 0.9;
                other.yspeed = temp2 * -0.8;
            }
        }
       
    }
    
    this.kick = function(){
        if(kicked){
            this.xspeed += Math.floor(rangeX.value);
            this.yspeed += Math.floor(rangeY.value); 
            kicked = false;
        }  
    }
    this.edges = function(){
        if(this.posY + img.height >= canvas2.height){
            this.posY = canvas2.height - img.height;
            this.yspeed *= -0.9;
        }
        if(this.posY <= 0){
            this.posY = 0;
            this.yspeed *= -0.9;
        }
        if(this.posX <= 0){
            this.posX = 0;
            this.xspeed *= -0.9;
        }
        if(this.posX + img.width >= canvas2.width){
            this.posX = canvas2.width - img.width;
            this.xspeed *= -0.9;
        }
 
    }
    this.applyForce = function(){
        this.yspeed += this.gravity;
        this.posY += this.yspeed;
        this.posX += this.xspeed;
        if(this.yspeed > this.maxSpeed){
            this.yspeed = this.maxSpeed;
        }
    }
    this.applyFriction = function(){
        if(this.posY + img.height >= canvas2.height){
            if(this.xspeed > 0){
                this.xspeed -= this.friction;
            }else if(this.xspeed < 0){
                this.xspeed += this.friction;
            }
        }
        if(this.xspeed >= -0.3 && this.xspeed <= 0.3){
            this.xspeed = 0;
        }
    }
    this.show = function(){
        c.drawImage(img, this.posX, this.posY);
    }
    this.updateCenter = function(){
        this.centerX = this.posX + 50;
        this.centerY = this.posY + 50;
    }
}


//window.onload = loadCanvas2;







