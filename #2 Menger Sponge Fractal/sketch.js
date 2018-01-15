/**
* This code creates a menger sponge fractal
* It uses the p5.js library to create 3d shapes.
*
*
*
**/

//turns the cube to see differen't angles
var turning = 0;
var turningRate = 0.01;

var cubeSize = 0;

function setup() {
   createCanvas(500,500,WEBGL);
}


function draw() {
    frameRate(60);
    background(51);
   
    
    turning += turningRate;
     rotateX(turning);
    rotateY(turning);  
    CubeRecursion(40,cubeSize);
}


function mousePressed(){
    cubeSize = cubeSize + 1;
}

//this is the only function that is actually called. 
//It is a recursion call that splits 1 regular box into smaller and smaller boxes (the boxes will form a menger sponge Fractal shape).
function CubeRecursion(boxLength,counter){
    
    //bounce out the equation is counter hits 0
    if(counter === 0){
        //multiplying by 3 because the recursion call divides the boxLength by 3, 
        //not doing this would result in abnormally small boxes in the sponge fractal.
        box(boxLength*3, boxLength*3,boxLength*3)
        return 0;
    }
    var cubeSize = 3;
    
    
    for(var x = 0 ; x < cubeSize ; x ++){
        
        for(var y = 0 ; y < cubeSize ; y++){
            
            
            for( var z = 0 ;  z < cubeSize ; z++){
            
            //because translate() has a cumulative effect, I have to save the original position of translate so I can use it later
            push();
            translate(x*boxLength,y*boxLength,z*boxLength);
                
            //The if statements just creates the menger fractal sponge pattern
            //https://en.wikipedia.org/wiki/Menger_sponge
            //no idea why if buggs if i have more than 1 && statement in there. So i seperated them.
            if(x !=1 || y!=1 && z != 1 || x!=1 ){
                if( y != 1 || z!= 1){
                    //this will take each cube that we make and break them up into smaller cubes
                    this.counter = counter - 1;
                    CubeRecursion(boxLength/3,this.counter);
                    
                    
                }
            }
            //loads the previous position of translate(),
            pop();
                
            }
        }
            
    }
}








/**

//this function isn't used, just here so I can remember what my thought process for the recursion is
function makeCube(boxLength ){
    
    var cubeSize = 3;
    
    
    for(var i = 0 ; i < cubeSize ; i ++){
        
        for(var j = 0 ; j < cubeSize ; j++){
            
            
            for( var k = 0 ;  k < cubeSize ; k++){
            
            push();
            translate(i*boxLength,j*boxLength,k*boxLength);
                
            //no idea why if buggs if i have more than 1 && statement in there. So i seperated them.
            if(i !=1 || j!=1 && k != 1 || i!=1 ){
                if( j != 1 || k!= 1)
                box(boxLength,boxLength,boxLength);
            }
            pop();
                
            }
        }
            
    }
}

//this code isn't used
//this was the original recursion loop,  CubeRecursion() is just makeCube() & moreCubes() combined to reduce repetition in code
function moreCubes(boxLength, counter){
    if(counter < 0 ){
        makeCube(boxLength);
        return 0;
   
    }
    
    var cubeSize = 3;
    for(var i = 0 ; i < cubeSize ; i ++){
        
        for(var j = 0 ; j < cubeSize ; j++){
            
            
            for( var k = 0 ;  k < cubeSize ; k++){
            
            push();
            translate(i*boxLength,j*boxLength,k*boxLength);
                
            //no idea why if buggs if i have more than 1 && statement in there. So i seperated them.
            if(i !=1 || j!=1 && k != 1 || i!=1 ){
                if( j != 1 || k!= 1){
                    
                    var newCount = counter -1;
                    moreCubes(boxLength/3,newCount);
                
                    
                    
                }
            }
            pop();
                
            }
        }
            
    }
}
**/