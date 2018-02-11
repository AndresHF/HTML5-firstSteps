//JavaScript documents

var canvasSteering;
var c4;

var steertinStart;
var steeringSplit;
var steeringReset;
var steeringMode;

var steeringRepulsion;
var steeringAtraction = true;

var steeringContainer;

var bucleSteering;

var steeringVehicles = [];
var steeringVehiclesNum = 1000;
var desireVelocity = 0.3;
var steeringVehicleRadius = 2;
var steeringAcceleration;
var steeringMaxSpeed = 15;
var sMaxSpeed = 15;
var sMinSpeed = -15;

var bucleLimpieza;
var cleeningInterval = 100;

var imagenLobo = new Image();
var loboData;

function loadCanvasSteering(){
    
    canvasSteering = document.getElementById("canvasSteering");
    canvasSteering.width = 850;
    canvasSteering.height = 600;
    canvasSteering.style.backgroundColor = "black";
    
    steeringStart = document.getElementById("comienzaSteering");
    steeringSplit = document.getElementById("steeringSplit");
    steeringReset = document.getElementById("steeringReset");
    steeringMaxSpeed = document.getElementById("steeringMaxSpeed");
    steeringMode = document.getElementById("onmouse");
    steeringRepulsion = document.getElementById("repulsion");
    steeringContainer = document.getElementById("contenedorSteering");
    
    imagenLobo.src="lobo.jpg";
    //loboData = c.getImageData(0,0,imagenLobo.width, imagenLobo.height);
    
    c4 = canvasSteering.getContext("2d");
    c4.strokeStyle = "rgb(200,200,200)";
    
    for(var i = 0; i < steeringVehiclesNum; i ++){
        steeringVehicles.push(new SteeringObject("vehicle",Math.floor(Math.random()*2)+2));
    }
    steeringDesire = new SteeringObject("desire",10);

    comienzaSteering.addEventListener("click", launchSteering, false);
    steeringSplit.addEventListener("click", splitSteeringVehicles, false);
    steeringReset.addEventListener("click", resetSteeringVehicles, false);
    steeringMaxSpeed.addEventListener("input", setSteeringMaxSpeed, false);
    steeringRepulsion.addEventListener("click", setAtraccionRepulsion, false);
    
    steeringMode.addEventListener("click", setMode, false);
    canvasSteering.addEventListener("mousemove", setDesirePos, false);
    canvasSteering.addEventListener("dblclick", limpiaPantalla, false);
}
function randomPos(){
    steeringDesire.posX = Math.floor(Math.random() * canvasSteering.width);
    steeringDesire.posY = Math.random() * canvasSteering.height;
}
function launchSteering(){
  
    if(comienzaSteering.value == "Start"){
        c4.drawImage(imagenLobo,0,0);
        loboData = c4.getImageData(0,0,imagenLobo.width, imagenLobo.height);
        c4.clearRect(0,0,canvasSteering.width, canvasSteering.height);
        bucleSteering = setInterval(steeringLoop, 30);
        //bucleLimpieza = setInterval(randomPos,cleeningInterval);
        comienzaSteering.value = "Stop";
    }else{
        clearInterval(bucleSteering);
        //clearInterval(bucleLimpieza);
        comienzaSteering.value = "Start";
    }
}
function limpiaPantalla(){

    c4.clearRect(0,0,canvasSteering.width,canvasSteering.height);
        //c4.putImageData(loboData,0,0);
}

function steeringLoop(){
    //c4.clearRect(0, 0, canvasSteering.width, canvasSteering.height);
    //steeringDesire.show();  


    for(var i in steeringVehicles){
        steeringVehicles[i].checkSpeedValues();
        steeringVehicles[i].setDesireDirection(steeringDesire);
        steeringVehicles[i].checkDesireVelocity(steeringDesire);
        steeringVehicles[i].show();
    }
}
function splitSteeringVehicles(){
    for(var i in steeringVehicles){
        steeringVehicles[i].xspeed *= Math.floor(Math.random() * 30) -15;
        steeringVehicles[i].yspeed *= Math.floor(Math.random() * 30) -15;
    }

}
function setMode(){
    if(steeringMode.value == "Click"){
        steeringMode.value = "Move";
        canvasSteering.removeEventListener("click",setDesirePos);
        canvasSteering.addEventListener("mousemove",setDesirePos,false);
    }else{
        steeringMode.value = "Click";
        canvasSteering.removeEventListener("mousemove",setDesirePos);
        canvasSteering.addEventListener("click",setDesirePos,false);
    }
}
function setAtraccionRepulsion(){
    if(steeringRepulsion.value == "Attraction"){
        steeringAtraction = false;
        steeringRepulsion.value = "Repulsion";
    }else{
        steeringAtraction = true;
        steeringRepulsion.value = "Attraction";
    }
}
function setDesirePos(e){
    steeringDesire.posX = e.pageX - steeringContainer.offsetLeft;
    steeringDesire.posY = e.pageY - steeringContainer.offsetTop;
}
function resetSteeringVehicles(){
    
    steeringVehicles.splice(0,steeringVehicles.length);
    for(var i = 0; i < steeringVehiclesNum; i++){
        steeringVehicles.push(new SteeringObject("vehicle", steeringVehicleRadius));
    }
    steeringMaxSpeed.value = 0.5;
    steeringAcceleration = steeringMaxSpeed.value;
}
function setSteeringMaxSpeed(){
    steeringAcceleration = steeringMaxSpeed.value;
}



function SteeringObject(name, r){
    
    this.name = name;
    this.r = r;
    this.red = 0;//Math.floor(Math.random()*255)+100;
    this.green = Math.floor(Math.random()*255)+100;
    this.blue = Math.floor(Math.random()*255)+100;


    if(name == "vehicle"){
        this.posX = canvasSteering.width/2;//Math.random()* canvasSteering.width;
        this.posY = canvasSteering.height/2;//Math.random()* canvasSteering.height;
        this.xspeed = Math.floor(Math.random() * 10) - 5;
        this.yspeed = Math.floor(Math.random() * 10) - 5;
    }else{
        this.posX = canvasSteering.width/2;
        this.posY = canvasSteering.height/2;
        this.xspeed = 0;
        this.yspeed = 0;
    }

    steeringAcceleration = steeringMaxSpeed.value;

    this.checkSpeedValues = function(){
        if(this.xspeed > sMaxSpeed){
            this.xspeed = sMaxSpeed;
        }
        if(this.xspeed < sMinSpeed){
            this.xspeed = sMinSpeed;
        }
        if(this.yspeed > sMaxSpeed){
            this.yspeed = sMaxSpeed;
        }
        if(this.yspeed < sMinSpeed){
            this.yspeed = sMinSpeed;
        }
    }

    this.checkDesireVelocity = function(other){
        
        var d = Math.floor(Math.sqrt(Math.pow(other.posX - this.posX, 2) + Math.pow(other.posY - this.posY, 2)));
        
        if(steeringAtraction){
            if(d < this.r + other.r){
                this.xspeed += Math.floor(Math.random()*7)-3;
                this.yspeed += Math.floor(Math.random()*7)-3;
            }else if(d < 600){
                if(this.xspeed > 0){
                this.xspeed -= desireVelocity;
                }
                if(this.xspeed < 0){
                    this.xspeed += desireVelocity;
                }
                if(this.yspeed > 0){
                    this.yspeed -= desireVelocity;
                }
                if(this.yspeed < 0){
                    this.yspeed += desireVelocity;
                }
            }
        }else{
            
            if(d <= 150){
                this.xspeed *= -1;
                this.xspeed *= -1;
                if(this.xspeed > 0){
                this.xspeed += desireVelocity / Math.pow(d, 2);
                }
                if(this.xspeed < 0){
                    this.xspeed -= desireVelocity / Math.pow(d, 2);
                }
                if(this.yspeed > 0){
                    this.yspeed += desireVelocity / Math.pow(d, 2);
                }
                if(this.yspeed < 0){
                    this.yspeed -= desireVelocity / Math.pow(d, 2);
                }
            }else{
                if(this.xspeed > 0){
                    this.xspeed -= desireVelocity;
                }
                if(this.xspeed < 0){
                    this.xspeed += desireVelocity;
                }
                if(this.yspeed > 0){
                    this.yspeed -= desireVelocity;
                }
                if(this.yspeed < 0){
                    this.yspeed += desireVelocity;
                }
            }
        }
   
    }
    this.setDesireDirection = function(other){
        var randomAcc = Math.random();
        if(steeringAtraction){
            if(this.posX >= other.posX){
                this.xspeed -= steeringAcceleration * Math.cos(randomAcc) * 2;
                this.posX += this.xspeed;
            }else if(this.posX < other.posX){
                this.xspeed += steeringAcceleration * Math.sin(randomAcc) * 2;
                this.posX += this.xspeed;
            }

            if(this.posY >= other.posY){
                this.yspeed -= steeringAcceleration * Math.cos(randomAcc) * 2;
                this.posY += this.yspeed;
            }else if(this.posY < other.posY){
                this.yspeed += steeringAcceleration * Math.sin(randomAcc) * 2;
                this.posY += this.yspeed;
            }
        }else{
            if(this.posX >= other.posX){
                this.xspeed += steeringAcceleration * Math.cos(randomAcc);
                this.posX += this.xspeed;
            }else if(this.posX < other.posX){
                this.xspeed -= steeringAcceleration * Math.sin(randomAcc);
                this.posX += this.xspeed;
            }

            if(this.posY >= other.posY){
                this.yspeed += steeringAcceleration * Math.cos(randomAcc);
                this.posY += this.yspeed;
            }else if(this.posY < other.posY){
                this.yspeed -= steeringAcceleration * Math.sin(randomAcc);
                this.posY += this.yspeed;
            }
        }
        if(this.posX < 0 ){
            this.posX = 0;
        }else if(this.posX > canvasSteering.width){
            this.posX = canvasSteering.width;
        }
        if(this.posY < 0){
            this.posY = 0;
        }else if(this.posY > canvasSteering.height){
            this.posY = canvasSteering.height;     
        }
    }

    this.show = function(){
    
        var index = (Math.floor(this.posX) + Math.floor(this.posY) * imagenLobo.width) * 4;
        //DESCOMENTAR PARA lA FOTO
        var gray = loboData.data[index+0] + loboData.data[index+1] + loboData.data[index+2] / 3;
        this.red = loboData.data[index+0];
        this.green = loboData.data[index+1];
        this.blue = loboData.data[index+2];
        
        /*this.red = Math.floor(Math.random() * 255);
        this.green = Math.floor(Math.random() * 255);
        this.blue = Math.floor(Math.random() * 255);*/


        if(this.name == "vehicle"){
            c4.fillStyle = "rgba("+this.red+","+this.green+","+this.blue+",0.9)";
        }else{
            c4.fillStyle = "rgb(255,0,0)";
        }
        c4.beginPath();
        c4.arc(this.posX, this.posY, this.r, 0 , Math.PI*2, false);
        c4.closePath();
        c4.fill();
        
    }
    
}