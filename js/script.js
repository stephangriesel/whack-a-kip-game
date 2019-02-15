// $(document).ready(function () { // My overlay does not work if this is enabled

// VARIABLES
const totalScore = document.getElementById("score"); // issue again with jquery
const cages = document.querySelectorAll(".cage");
const kips = document.querySelectorAll(".kip"); // could not get foreach working when using jquery syntax
let lastCage; // skip cage if same as previous
let endGame = false; // if true game stops
let score = 0;
let difficulty = { // level difficulty, set min/max
  min: 1000,
  max: 3000
}
let duration = { // set duration of game - coming in version 2 ;)
  ten: 10,
  twenty: 20,
  thirty: 30
}
const chicken = new Audio('audio/chicken.mp3'); // Chicken sound when game starts, cuckalakoooooo!
const slap = new Audio('audio/slap2.mp3'); // Slap sound when chicken whacked

// SCROLLING TITLEBAR - thank you Stackoverflow :)
(function titleScroller(text) {
  document.title = text;
  setTimeout(function () {
      titleScroller(text.substr(1) + text.substr(0, 1));
  }, 200);
}("Whack-A-Kip - Whack-A-Kip - Whack-A-Kip - Whack-A-Kip "));

// OVERLAY LEVEL SELECT
function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}

// KEYPRESS START GAME
window.onkeypress = function (event) {
  if (event.keyCode == 32) {
    beginGame();
  }
}

// CLICK EVENTS - DIFFICULTY BUTTONS
$("#easy-btn").click(function () {
  $(".level-selected").html("Level Selected: Easy");
  difficulty.min = 3000;
  difficulty.max = 4000;
})

$("#medium-btn").click(function () {
  $(".level-selected").html("Level Selected: Medium");
  difficulty.min = 1500;
  difficulty.max = 2000;
})

$("#hard-btn").click(function () {
  $(".level-selected").html("Level Selected: Hard");
  difficulty.min = 500;
  difficulty.max = 900;
})

// CLICK EVENTS - START BUTTON
$("#start").click(function () {
  beginGame();
});

// // CLICK EVENTS - DURATUTION BUTTONS - Coming in version 2 ;)
$("#duration-10").click(function () {
  $("#countdown").html("10");
  duration.ten = 10;
})

$("#duration-20").click(function () {
  $("#countdown").html("20");
  duration.twenty = 20;
})

$("#duration-30").click(function () {
  $("#countdown").html("30");
  duration.thirty = 30;
})

// FUNCTION: Random time: min/max
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// FUNCTION: Random cage
function randomCage(cages) {
  console.log(cages.length); // nodelist cages
  const randomNumber = Math.floor(Math.random() * cages.length);
  const cage = cages[randomNumber]; // random index number
  console.log(cage);
  if (cage === lastCage) { // skip cage if same as previous
    console.log("same cage, moving on...");
    return randomCage(cages);
  }
  lastCage = cage;
  return cage;
}

// FUNCTION: Show kip
function popupKip() {
  const time = randomTime(difficulty.min, difficulty.max); // random time function get values from difficulty level buttons, default set to easy
  const cage = randomCage(cages); // random cage function selection for nodelist
  console.log(time, cage);
  // console.log(time, cage);
  cage.classList.add("show");
  setTimeout(function () {
    cage.classList.remove("show");
    if (!endGame) popupKip(); // variable defined, if TRUE game will stop
  }, time)
}

// FUNCTION: Begin game 
function beginGame() {
  chicken.play();
  $("#countdown").html("20"); // set timer to 10 once game starts
  var seconds = document.getElementById("countdown").textContent; // game countdown start
  var countdown = setInterval(function () {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
  }, 1000);
  endGame = false;
  score = 0;
  popupKip();
  setTimeout(function () {
    endGame = true
  }, 20000); // gameplay time
}

// FUNCTION: Whack kip and update score
function whack(e) {
  slap.play(); // slap sound when clicked
  console.log(e); // log mouse event
  score++; // increment score 
  // $(".cage").removeClass("show"); // issues with jquery, removed for now
  this.classList.remove("show"); // remove kip if clicked
  totalScore.textContent = score; // your score update, for my own reference: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
}

// FUNCTION: Explode kip 
$(".kip").click(function () {
  $(this).parent(".cage").removeClass("show");
  $(this).addClass("kipExplode");
  setTimeout(() => {
    $(this).removeClass("kipExplode");
  }, 1000)
})

// Loop through kips

kips.forEach(kip => kip.addEventListener('click', whack)); // loop through nodelist. had issues when trying to use jquery when variable defined here. for my own reference: https://www.geeksforgeeks.org/javascript-array-foreach/

// });


