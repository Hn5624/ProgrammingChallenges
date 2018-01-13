//set initial keys to false, if keys are pressed, set that key to true 
var Keys = {
        up: false,
        down: false,
        left: false,
        right: false
    }; 
    window.onkeydown = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if      (kc === 37) Keys.left = true;  // only one key per event
    else if (kc === 38) Keys.up = true;    // so check exclusively
    else if (kc === 39) Keys.right = true;
    else if (kc === 40) Keys.down = true;
};

//if key is let go, set that key to false
window.onkeyup = function(e) {
    var kc = e.keyCode;
    e.preventDefault();

    if      (kc === 37) Keys.left = false;
    else if (kc === 38) Keys.up = false;
    else if (kc === 39) Keys.right = false;
    else if (kc === 40) Keys.down = false;
};
    

    function doKeyDown(){

        //change where the circles are being drawn on the screen based on what key you press
        if(Keys.up ) 
            ay= 0.1;
        if(Keys.down ) 
            ay= -0.1;
        if(Keys.left)
            ax = 0.1;
        if(Keys.right) 
            ax= -0.1;
        
        //if user tries to change view too much, put a limit on it
        if(vx > 1500)
            ax = 0;
        if(vx < -1500)
            ax = 0;
        if(vy > 1500)
            ay = 0;
        if(vy < -1500)
            ay = 0;
        
        //if no keys are pressed, slowly revert back into default values
        if(!Keys.up && !Keys.down && !Keys.left && !Keys.right){
            if(vx > 1)
                ax = -0.1;
            if(vx < -1)
                ax = 0.1;
            if(vx < 1 && vx > -1)
                ax = 0;
            
            if(vy > 1)
                ay = -0.1;
            if(vy < -1)
                ay = 0.1;
            if(vy < 1 && vy > -1)
                ay = 0;
    
        }
        
        
};
    