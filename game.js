//button color array
var buttonColours = ["red", "blue", "green", "yellow"];
//from next sequence function a color will be pushed to this array
var gamePattern = [];
//from selected button through the id color will be pushed into userClickedPattern
var userClickedPattern = [];

var started = false;
var level = 0;
//to know whether user has pressed anything or not to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  //which color is choosen by user will be get pushed to userclicked pattern
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //sound and animation given for click by user
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//To know what next is coming and according to that sound will played along with some animation
function nextSequence() {
  userClickedPattern = [];
  //to let the user know that after he has clicked a key level 1 or the game has started.
  level++;
  //change the content to show which level is going on
  $("#level-title").text("Level " + level);
  //random number generation
  var randomNumber = Math.floor(Math.random() * 4);
  //from random number we'll get the colour
  var randomChosenColour = buttonColours[randomNumber];
  //random colour will be pushed to game pattern array
  gamePattern.push(randomChosenColour);
  //animation given
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //song played to let the user know what next is coming
  playSound(randomChosenColour);
}
//animation given for the square after been clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//song played after been clicked
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
