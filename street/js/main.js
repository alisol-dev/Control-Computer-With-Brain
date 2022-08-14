function startBrainGame(){
    setPointerAtCenter();
    setTimeout(brainGameLoop, 3000);
}

function brainGameLoop(){
    
    // Returns a random integer from 0 to 9:
    randNumber = Math.floor(Math.random() * 10);
    
    if( randNumber <= 4 ){
        goLeft();
    } else {
        goRight();
    }
    
    setTimeout(displayCurrentPositionOnPointer, 10);
    setTimeout(brainGameLoop, 1000);
}

function getPointerCurrentPosition(){
    currentPosition = $(".pointer").css("left");
    currentPosition = parseInt(currentPosition);
    return currentPosition;
}

function getChangeByPX(){
    containerWidth = $(".container").width();
    containerWidth = parseInt(containerWidth);
    containerWidth = Math.floor(containerWidth / 100);
    return containerWidth;
}

function goLeft(){
    newPosition = getPointerCurrentPosition() - getChangeByPX();
    $(".pointer").css("left", newPosition + "px");
}

function goRight(){
    newPosition = getPointerCurrentPosition() + getChangeByPX();
    $(".pointer").css("left", newPosition + "px");
}

function displayCurrentPositionOnPointer(){
    currentPosition = getPointerCurrentPosition();
    $(".pointerText").text(currentPosition);
    
    setTimeout(displayCurrentPositionOnPointer, 10);
}

function setPointerAtCenter(){
    containerWidth = $(".container").width();
    pointerWidth = $(".pointer").width();
    pointerStartLeftMargin = (containerWidth / 2) -  (pointerWidth / 2);
    $(".pointer").css("marginLeft", pointerStartLeftMargin);
}

function displayStartConfirmBox(){
    if (confirm("Are you ready to start?") == true) {
        // text = "You pressed OK!";
        startBrainGame();
    } else {
        // text = "You canceled!";
    }
}

$(document).ready(function() {
    
    // displayIntro();
    displayStartConfirmBox();
    
    $(".pointer").change(function(){
      alert("The text has been changed.");
    }); 
    
});