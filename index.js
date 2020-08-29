
var colours = ["green", "red", "yellow", "blue"];

var randomColourArray = [];
var selectedColourArray = [];

var selected = false;
var level = 0;

$(document).on("keypress", function() {
  if (!selected) {
    randomNumber();
    $("h1").text("Level "+level);
    selected = true;
  }
});

function randomNumber () {
  selectedColourArray = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var colour = colours[randomNumber];
  randomColourArray.push(colour);
  console.log(randomColourArray);
  playSound(colour);
  startAnimation(colour);
}

$(".btn").on("click", function() {
  var colourClicked = $(this).attr("id");
  selectedColourArray.push(colourClicked);
  console.log(selectedColourArray);
  playSound(colourClicked);
  startAnimation(colourClicked);
  checkAnswer(selectedColourArray.length - 1);
});

function checkAnswer(arrayLength) {
  if (selectedColourArray[arrayLength] === randomColourArray[arrayLength]) {
    console.log("success");
    if (selectedColourArray.length === randomColourArray.length) {
      setTimeout(function() {
        randomNumber();
      },400);
      $("h1").text("Level "+level);
    }
  } else {
    console.log("error");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    reset();
  }
}

function playSound(audio) {
  var audio = new Audio("sounds/"+audio+".mp3");
  audio.play();
}

function startAnimation(idName) {
  $("#"+idName).addClass("pressed");
  setTimeout(function() {
    $("#"+idName).removeClass("pressed");
  }, 100);
}

function reset() {
  selected = false;
  level = 0;
  randomColourArray = [];
}
