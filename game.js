var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;






$(document).keydown (function () {
  if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click (function(){
  var usrChosenColour = $(this).attr("id");
  userClickedPattern.push(usrChosenColour);

  playSound(usrChosenColour);
  animatePress(usrChosenColour);


  checkAnswer(userClickedPattern.length -1);
});


function nextSequence () {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours [randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);



}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
      $("#level-title").text("一二一二幾時輪到隻手呀，小兒麻痺磨，撳多次KEYBOARD是旦一粒掣再黎過啦");

      startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
