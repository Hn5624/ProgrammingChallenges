var canvas = document.getElementById("canvas");
        var context = canvas.getContext('2d');
        var width = canvas.width = window.innerWidth;
        var height = canvas.height = window.innerHeight;


        var starNumber = 400;
        var speed = 20;
        var vx = 0;
        var vy = 0;
        var ay = 0;
        var ax = 0;
        
        //used the idea from p5.js library map to get movement in stars.
        function map(value,min,max,newMin,newMax){
            var val = value-min;
            var diff = max-min;
            var percentage = val/diff;
            
            var diff2 = newMax - newMin;
            var newVal = percentage*diff2;
            var newVal = newVal + newMin;
    
            return newVal;
        }

        //create the initial stars
        var starList = [];
        for(var i = 0 ; i < starNumber; i ++){
            starList.push(new star());
            starList[i].render(context);
        }
        
 
       
        function star(){
            //stars spawn on random points on the screen
            //the weird math is because i want it to be a value between negative Width and Positive Width  
            
            this.x = Math.random()*width*2 - width;
            this.y = Math.random()*height*2 - height;
            this.z = Math.random()*width;
            this.r = 2;
            
           //old position variable, used for a after image effect
            this.pz = this.z;
        
            //draws the circle, and applies the movements, should probably be split up into different functions 
            this.render = function(context){
                
                
                this.z -= speed;
            
                var sx = map(this.x/this.z, 0,1,1,width);
                var sy = map(this.y/this.z, 0,1,1,height);
                
                var rFactor =  (  Math.abs(this.x) + Math.abs(this.y) /2 )/(this.z)
                var r = map(  rFactor, 0,1, 2,20);
           
                if( this.z < 1){
                    this.x = Math.random()*width*2 - width;
                    this.y = Math.random()*height*2   - height;
                    this.z = Math.random()*width;
                    this.pz = this.z;
                }
                
                
                else {
               
                context.beginPath();
                //this changes direction they are all flowing
                //vx+width/2 means i want them to float away from center of screen
                //Depending on the orientation when the star is spawned, Positive value which pushes them down and right, or a negative value, which pushes them up and left.
                context.arc(sx+width/2 + vx ,sy+height/2 +vy ,Math.abs(r),0,2*Math.PI);
                var q = 200;
                context.fillStyle = "hsl(" + q + ",50%,84%)";
                context.fill();
                
                vx += ax;
                vy += ay;
                
               
                
                //this code just creates a little shadow of the circles that your passing
                var px = map(this.x/this.pz , 0,1,1,width);
                var py = map(this.y/this.pz , 0,1,1,height);
            
                //just draws a from the circles new position to the circles old position based on value --pz--
                context.beginPath();
                context.moveTo(sx+width/2 + vx,sy+height/2 +vy);
                context.lineTo(px+width/2 + vx,py+height/2 +vy);
                context.strokeStyle = "hsl(" + q + ",50%,84%)";
                context.stroke();
                this.pz  = this.z;
                }
            }
                
        }
        

        
        function update(){
            context.clearRect(0,0,width,height)
            context.fillStyle="#000";
            context.fillRect( 0, 0 ,width,height);
            
            context.fillStyle="white";
            context.font="20px Arial";
            context.fillText("Use arrow Keys to move view", 100,100);
           doKeyDown();
            for(var i = 0 ; i < starList.length ; i ++)
                starList[i].render(context);
                
            
            requestAnimationFrame(update);
        
              
        }
        

    
        update();
        
        
        
    