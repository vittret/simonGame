var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
 
});

$(".btn").click(function(event) {
   var userChosenColor = (event.target.id);
   userClickedPattern.push(userChosenColor)
    
  //  var userChosenColor = $(this).attr("id");
  //  userClickedPattern.push(userChosenColor);
    
       
    console.log(userChosenColor);

    checkAnswer(userClickedPattern.length-1); 


    var audio = new Audio("sounds/" + userChosenColor + ".mp3");
    audio.play();
    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#" + userChosenColor).removeClass("pressed");
    }, 100);
     
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    { console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
    } else {
        console.log("wrong");
        var overAudio = new Audio("sounds/wrong.mp3");
        overAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
};


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);
    // var randomNumber = Math.trunc(Math.random()*4);
    var randomNumber = Math.floor(Math.random()*4);
    // var randomChosenColor = buttonColors[Math.floor(Math.random(buttonColors)*buttonColors.length)];
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();

};

function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
}

