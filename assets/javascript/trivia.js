// Trivia Game
// Variables
var trivia = {
  0 : { 
    question : 'Who was the only President to serve more than two terms?',
    choice : ['Franklin D. Roosevelt','Donald Trump','George Wasthington','Ulysses S. Grant'],
    answer : 0,
    fact : 'Franklin D. Roosevelt served as President for over 12 years, the longest time in office. He is the only president to serve more than two terms; he died shortly into his fourth term in 1945.'
  },
  1 : {
    question : "Who was the only President to serve two non-consecutive terms?",
    choice : ["Ronald Reagan","Woodrow Wilson","Theodore Roosevelt","Grover Cleveland"],
    answer : 3,
    fact : "Grover Cleveland served two non-consecutive terms and is counted chronologically as both the twenty-second and the twenty-fourth president."
  },
  2 : {
    question : "Who was the oldest elected President?",
    choice : ["James Buchanan","Ronald Reagan","Dwight D. Eisenhower","Zachary Taylor"],
    answer : 1,
    fact : "Ronald Reagan was the oldest president to assume office at 69 years, 349 days on January 20, 1981."
  },
  3 : {
    question : "Who was the first President to live in the White House?",
    choice : ["Andrew Jackson","Thomas Jefferson","John Adams","George Wasthington"],
    answer : 2,
    fact : "On Saturday, November 1, 1800, John Adams became the first president to take residence in the White House."
  } 
};
var qTime;  // Question display time in seconds
var fTime;  // Fact display time in seconds
var counter;
var showFact = false;
var questionCnt = 0;  // Question counter starting with 0
var btnQuestion;
var numCorrect = 0;
var numWrong = 0;
var numSkipped = 0;

//Functions
function countDown(){
  
  if (showFact == true) {
    qTime--;
    if (qTime == 0) {
      showFact = false;
      qTime = 10;
      questionCnt++;
    }
  }else{

    if (questionCnt >= Object.keys(trivia).length) {
      // Display Results
      $(".time").empty();
      $(".quest").empty();
      $(".btn-container").empty();
      $(".fact").empty();
      $(".results").html("Correct: " + numCorrect + "<br>");
      $(".results").append("Wrong: " + numWrong + "<br>");
      $(".results").append("Skipped: " + numSkipped + "<br>");
      $(".start").html("<button>Start</button>");
    }else{
      // Decrement time and output
      if (qTime == 0) {
        numSkipped++;
        $(".btn-container").empty();
        clearInterval(counter);
        fTime = 3;
        counter = setInterval(displayFact, 1000);
      }else {
        // Output and decrement time
        $(".time").text('Time Remaining: ' + qTime + ' Seconds');
        qTime--;
      }
    }
  }    
}

function displayQuestion(){
  $(".btn-container").empty();
  // Display Question
  var valueQ = trivia[questionCnt]["question"];
  $(".quest").text('Question: ' + valueQ );
  // Display a button for each choice
  for (var i = 0; i < 4; i++) {
    //var parameterC = trivia[questionCnt].choice[i];
    btnQuestion = $('<button type="button">' + trivia[questionCnt].choice[i] + '</button>').addClass("btn").addClass("btn btn-info").attr("data-btnvalue", i);
    $(".btn-container").append(btnQuestion);
  }
}

function displayFact(){
  if (fTime >= 0){
    //Display Fact
    $(".fact").text('Fact: ' + trivia[questionCnt].fact );
    fTime--;
  }else{
    clearInterval(counter);
    questionCnt++;
    if (questionCnt >= Object.keys(trivia).length) {
      // Display Results
      $(".time").empty();
      $(".quest").empty();
      $(".btn-container").empty();
      $(".fact").empty();
      $(".results").append("Correct: " + numCorrect + "<br>");
      $(".results").append("Wrong: " + numWrong + "<br>");
      $(".results").append("Skipped: " + numSkipped + "<br>");
      $(".start").html("<button>Start</button>")
    }else{
      displayQuestion();
      $(".fact").empty();
      qTime = 9;
      counter = setInterval(countDown, 1000);
    }
  }
}

//***********************************************************************************
// Click event to start the game
//***********************************************************************************
$(document).on("click",".start", function() {
  $(".start").empty();
  $(".results").empty();
  $(".time").html('Time Remaining:');
  questionCnt = 0;
  qTime = 9;
  showFact = false;
  numCorrect = 0;
  numWrong = 0;
  numSkipped = 0;
  displayQuestion();
  counter = setInterval(countDown, 1000);
});

//********************************************
// Click event for button choice
//********************************************
$(document).on("click",".btn", function() {
  // Get button value
  var btnValue = ($(this).data("btnvalue"));
  // Check for reset
  if (btnValue == "reset") {
    // Reset
  } else if (btnValue == trivia[questionCnt].answer){
    // Correct
    $(".btn-container").empty();
    $(".fact").html('<span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>')
    $(".fact").append('Correct!! <br>');
    numCorrect++;
    clearInterval(counter);
    fTime = 3;
    counter = setInterval(displayFact, 1000);
  }else{
    // Incorrect
    $(".btn-container").empty();
    $(".fact").html('<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>')
    $(".fact").append('Incorrect!! <br>');
    numWrong++;
    clearInterval(counter);
    fTime = 3;
    counter = setInterval(displayFact, 1000);
  }
});
