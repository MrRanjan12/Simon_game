//alert("hello ranjan ")

var buttonColours=["red","green","blue","yello"];

var gamePattern=[];
var userClickedPattern = [];
var gameStarted = false;
var level=0; 
// Function to start the game when a key is pressed
//document).keydown(function(event) {
  function startGame(){
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence(); // Call nextSequence() when a key is pressed for the first time
        gameStarted = true; // Set the game as started
        animatePress("A-button");
    }
    
};
// Keyboard press to start the game
$(document).keydown(startGame);

// Start button click to start the game
$("#A-button").click(startGame);


$(".btn").click(function() {
    // Step 2: Store the ID of the clicked button in userChosenColour
    var userChosenColour = $(this).attr("id");
      // Step 4: Add userChosenColour to the userClickedPattern array

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    // For testing purposes in the console
   // console.log(userClickedPattern);
   
   
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
};
function nextSequence(){
 userClickedPattern = [];
 level++;
  $("#level-title").text("Level " + level);
    
   var randomNumber=Math.random();
   randomNumber=randomNumber*4;
   randomNumber=Math.floor(randomNumber);
   var randomChosenColour=buttonColours[randomNumber];

   gamePattern.push(randomChosenColour);

   $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

// Function to animate button press effect
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); // Add the "pressed" class to the clicked button

    // Remove the "pressed" class after a delay of 100 milliseconds
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3"); // Create an audio element
    audio.play(); // Play the audio file
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
  }














