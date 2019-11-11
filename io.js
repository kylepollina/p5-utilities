/* io.js */

var isPaused = false;

function pause() {
    if(keyCode == 48) {
        if(isPaused == false) {
            isPaused = true;
            noLoop();
        }
        else if (isPaused == true) {
            isPaused = false;
            loop();
        }
    }
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
