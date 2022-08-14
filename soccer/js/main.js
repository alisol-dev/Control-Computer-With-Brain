
var gameHasBeenEnded = false;

$(document).ready(function() {
    
    setPointerAtHorizontalCenter();
    
    displayStartConfirmBox();
    
    $(".playButtons").click(function (){
        $('#StartConfirmBox').modal('hide');
    });
    
    $('#StartConfirmBox').on('hide.bs.modal', function (e) {
        startBrainGame();
    });
    
    $("#leftButton").click(function (){
        makeProgressbarVisible();
        trackingProgressFor("left");
    });
    
    $("#rightButton").click(function (){
        makeProgressbarVisible();
        trackingProgressFor("right");
    });
    
    $("#anonymousButton").click(function (){
        // nothing to do.
    });
    
});

$(window).resize(function() {
    setPointerAtVerticalCenter();
});



function setPointerAtHorizontalCenter(){
    wrapperWidth = $(".wrapper").width();
    pointerWidth = $(".pointer").width();
    pointerStartLeftMargin = (wrapperWidth / 2) -  (pointerWidth / 2);
    $(".pointer").css("marginLeft", pointerStartLeftMargin);
}

function displayStartConfirmBox(){
    
    $("#StartConfirmBox").modal("show");
    
}

function makeProgressbarVisible(){
    $(".progress-bar").fadeIn();
}

function trackingProgressFor(direction){
    
    currentPosition = getPointerCurrentPosition();
    
    
    progressPercent = getProgressPercentForGoal(currentPosition);
    
    if(
        (currentPosition <= 0 && direction == "right")
        ||
        (currentPosition >= 0 && direction == "left")
    ){
        
        if( progressPercent > 100 ){
            fixPointer(direction,"lost");
            gameHasBeenEnded = true;
            youLost();
            return;
        }
        
        progressPercent = 0;
    } else {
        if( progressPercent > 100 ){
            fixPointer(direction,"won");
            gameHasBeenEnded = true;
            youWon();
            return;
        }
    }
    
    $(".progress-bar--progress").css("width", progressPercent + "%");
    
    setTimeout(function() {trackingProgressFor(direction);}, 10); 
}

    function fixPointer(direction, status){
        maxProgressWidth = getMaxProgressWidth();
        
        if(
            (direction == "left" && status == "won")
            ||
            (direction == "right" && status == "lost")
        ){
            finalPosition = (-1) * maxProgressWidth;
        } else {
            finalPosition = (+1) * maxProgressWidth;
        }
        
        $(".pointer").css("left", finalPosition + "px");
    }

    function youLost(){
        alert("You lost! click ok to restart.");
         location.reload();
    }
    
    function youWon(){
        alert("You won! click ok to restart.");
        location.reload();
    }

    function getProgressPercentForGoal(currentPosition){
        
        maxProgressWidth = getMaxProgressWidth();
        progressPercent = Math.floor( Math.abs(currentPosition) * 100 / maxProgressWidth );
        return progressPercent;
    }
    
    function getMaxProgressWidth(){
        wrapperWidth = $(".wrapper").width();
        maxProgressWidth = wrapperWidth * 0.35;
        return maxProgressWidth;
    }
    
    function startBrainGame(){
        setTimeout(setPointerAtVerticalCenter, 500);
        setTimeout(brainGameLoop, 3000);
        setTimeout(function() {$(".pointer").removeClass("bouncing");$(".pointer").addClass("bounceEnded");}, 3000); 
        
    }
    
        function setPointerAtVerticalCenter(){
            wrapperHeight = $(".wrapper").height();
            wrapperWidth = $(".wrapper").width();
            
            
            pointerMarginTop = 0.5 * $(window).height() - 1.5 * $(".pointer").height();
            $(".pointer").css("marginTop", pointerMarginTop +"px");
            
            if( $(".pointer").hasClass("bounceEnded") === false ){
                $(".pointer").addClass("bouncing");
            }
            
        }
    
        function brainGameLoop(){
            
            if( gameHasBeenEnded === true ){
                return;
            }
            
            // Returns a random integer from 0 to 1:
            randNumber = Math.floor(Math.random() * 2);
            
            if( randNumber == 0 ){
                goLeft();
            } else if( randNumber == 1 ) {
                goRight();
            }
            
            // setTimeout(displayCurrentPositionOnPointer, 10);
            setTimeout(brainGameLoop, 1000);
        }
        
            function goLeft(){
                newPosition = getPointerCurrentPosition() - getChangeByPX();
                $(".pointer").css("left", newPosition + "px");
                $(".pointer").css("animation-name", "spinAntiClockwise");
            }
            
            function goRight(){
                newPosition = getPointerCurrentPosition() + getChangeByPX();
                $(".pointer").css("left", newPosition + "px");
                $(".pointer").css("animation-name", "spinClockwise");
            }
                
                function getPointerCurrentPosition(){
                    currentPosition = $(".pointer").css("left");
                    currentPosition = parseInt(currentPosition);
                    return currentPosition;
                }
                
                function getChangeByPX(){
                    wrapperWidth = $(".wrapper").width();
                    wrapperWidth = parseInt(wrapperWidth);
                    wrapperWidth = Math.floor(wrapperWidth / 50);
                    return wrapperWidth;
                }
    
function displayCurrentPositionOnPointer(){
    currentPosition = getPointerCurrentPosition();
    $(".pointerText").text(currentPosition);
    
    setTimeout(displayCurrentPositionOnPointer, 10);
}

