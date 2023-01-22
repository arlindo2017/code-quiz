// identify elements in the HTML page that will be modified
var timerEl = document.getElementById('timer');
var lastScoreEl = document.getElementById('last-score');
var quizHeaderEl = document.getElementById('header-message');

// Panels
var introEl = document.getElementById('intro-body');
var quizOptionsEl = document.getElementById('question-body');
var submitScoresEl = document.getElementById('submit-body');
var quizScoresEl = document.getElementById('scores-body');
var quizFooterEl = document.getElementById('footer-body');
var answerResultEl = document.getElementById('footer-message');
var quizCounterEl = document.getElementById('quiz-counter');

// form buttons
var initialsEl = document.getElementById('initials');
var clearScoresBtnEl = document.getElementById('clear-scores-btn');
var submitBtnEl = document.getElementById('submit-form');

// Navigation Buttons
var startBtnEl = document.getElementById('start-btn');
var goBackBtnEl = document.getElementById('go-back-btn');
var answerAEl = document.getElementById('option-a');
var answerBEl = document.getElementById('option-b');
var answerCEl = document.getElementById('option-c');
var answerDEl = document.getElementById('option-d');

// Global Variables
var timerValue = 50;
var highScores = [];
var highScoresText = "";
var savedScores = JSON.parse(localStorage.getItem("highscores"));

// sets question number sequence
var quizNumber = 1;
var numberOfQuestions = 10;

// creates a unique random number from the quiz-questions.js
var usedAnswers = [];
var randomNumber;

function generateRandomQuestion() {
    randomNumber = Math.floor(Math.random() * quizQuestions.length);
    while (usedAnswers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random()* quizQuestions.length);
    }
    usedAnswers.push(randomNumber);
    console.log("Generate a random number : " + randomNumber);
    return randomNumber;
}

// Timer values, enter how long per question
var initialTimer = (numberOfQuestions * 10);
var timerPenalty = 10;
var timerValue = initialTimer;
var gameStatus = false;

//Inital Values rendered in the HTML when page loads
timerEl.textContent = timerValue;
//gameStatusEl.textContent = gameStatus;
quizHeaderEl.textContent = "Click Start Quiz to begin!";
lastScoreEl.textContent = localStorage.getItem("scores");

//timer
var intervalId; 
function startTimer() {
   intervalId =  setInterval(function(){
        if (timerValue === 0) {
            clearInterval(intervalId);
            showOutOfTime();
        } else {
        timerValue--;
        timerEl.textContent = timerValue;
        }
    }, 1000); 
}

// list of Questions printed to the buttons
function showQuestionList() {
    console.log("Question # : " + (quizNumber) + " of " + (numberOfQuestions)); 
    quizCounterEl.textContent = ("Question " + (quizNumber) + " of " + (numberOfQuestions));
    quizHeaderEl.textContent = quizQuestions[randomNumber].question;
    answerAEl.textContent = "a) - " + quizQuestions[randomNumber].answers['a'];
    answerBEl.textContent = "b) - " + quizQuestions[randomNumber].answers['b'];
    answerCEl.textContent = "c) - " + quizQuestions[randomNumber].answers['c'];
    answerDEl.textContent = "d) - " + quizQuestions[randomNumber].answers['d'];  
    quizNumber++;          
}   

// Generate Questions
function startSequence() {
    // Action when game is out of questions
    if (quizNumber > numberOfQuestions) {
        console.log("Game Ended ....");
        quizCounterEl.textContent = "";
        showGameResults(); 
        clearInterval(intervalId);
        quizNumber = 1;
        usedAnswers = [];
        console.log("QuizNumber variable set back to : "+ quizNumber);
        console.log("usedAnswers reset back to []");
    // When clock runs out
    } else if (timerValue === 0){
        console.log("Out of time ....");
        showOutOfTime(); 
        quizNumber = 1;
        usedAnswers = [];
        console.log("QuizNumber variable set back to : "+ quizNumber);
        console.log("usedAnswers reset back to []");
    }
    else {
        gameStatusTrue() 
        generateRandomQuestion();
        showQuestionList();  
    }
}

// Display when game is out of time
function showOutOfTime() {
    quizHeaderEl.textContent = "Clock ran out\nYour Final Score : " + timerValue;
    gameStatusFalse();
    lastScoreEl.textContent = 0;
    localStorage.setItem("scores", 0);
    quizScoresEl.style.visibility = "visible";
    quizFooterEl.style.backgroundColor = "#FFA07A";
    quizCounterEl.textContent = "";
    answerResultEl.textContent = "Out of time, better luck next time.";
    quizNumber = 1;
    usedAnswers = [];
    highScores = [];
}

// Display when game ends
function showGameResults() {
    submitScoresEl.style.visibility = "visible";
    quizHeaderEl.textContent = "End of Questions.\nEnter your initials and submit your scores of " + timerValue;
    quizFooterEl.style.backgroundColor = "#dcdcdc";
    gameStatusFalse();
}

// Show scores
function showHighScores(event) {
    event.preventDefault(); 
    quizHeaderEl.textContent = "Your Score."
    quizScoresEl.style.visibility = "visible";
    submitScoresEl.style.visibility = "hidden";
    quizFooterEl.style.backgroundColor = "#dcdcdc";
    
    var storedScores = localStorage.getItem("scores");
    if (storedScores !== null) {
        localStorage.clear("scores");
        localStorage.setItem("scores", initialsEl.value + " :  "+ timerValue);
        quizHeaderEl.textContent =  "Your Score: " + localStorage.getItem("scores");
        answerResultEl.textContent = "Score Updated.";
        console.log("score updated");
    }else {
        localStorage.setItem("score", initialsEl.value + " :  "+ timerValue);
        quizHeaderEl.textContent =  "Your Score: " + localStorage.getItem("scores");
        answerResultEl.textContent = "Score added.";
        console.log("Score added");
    }      
}

// Show screen to restart game
function restartQuiz() {
    quizHeaderEl.textContent = "Click Start to try again!";
    clearInterval(intervalId);
    timerValue = initialTimer;
    timerEl.textContent = timerValue;
    startBtnEl.style.visibility = "visible";
    introEl.style.visibility = "visible";
    quizScoresEl.style.visibility = "hidden";
    lastScoreEl.textContent = localStorage.getItem("scores");
    answerResultEl.textContent = "Scores Cleared"; 
    quizFooterEl.style.backgroundColor = "#dcdcdc";
}

// When user clears scores, resets all variables
function clearScores(event) {
    event.preventDefault();
    console.log("Scores have been cleared.");
    localStorage.setItem("scores", 0);
    quizScoresEl.style.visibility = "visible";
    quizNumber = 1;
    usedAnswers = [];
    highScores = [];
    restartQuiz();
}

// set visibility based on game status
function gameStatusTrue() {
    gameStatus = true;
    startBtnEl.style.visibility = "hidden";
    introEl.style.visibility = "hidden"; 
    quizOptionsEl.style.visibility = "visible";
    submitScoresEl.style.visibility = "hidden";
    quizScoresEl.style.visibility = "hidden";
}

function gameStatusFalse() {
    gameStatus = false;
    introEl.style.visibility = "hidden"; 
    quizOptionsEl.style.visibility = "hidden";
    answerResultEl.textContent = "";
}

function answeredCorrectly() {
    quizFooterEl.style.backgroundColor = "#8FBC8F";
    answerResultEl.textContent = "Correct.";
}

function answeredIncorrectly() {
    quizFooterEl.style.backgroundColor = "#FFA07A";
    answerResultEl.textContent = "Incorrect, -" + timerPenalty + " was deducted from your time.";
}
    
// Buttons clicked by users
function answerA() {
    console.log('You Clicked : a');
    if (quizQuestions[randomNumber].correctAnswer == 'a') {
        answeredCorrectly()
        startSequence();  
    }else {
        timerValue = (timerValue - timerPenalty);
        timerEl.textContent = timerValue;
        answeredIncorrectly()
        startSequence(); 
    }
}

function answerB() {
    console.log('You Clicked : b');
    if (quizQuestions[randomNumber].correctAnswer == 'b') {
        answeredCorrectly()
        startSequence();  
    }else {
        timerValue = (timerValue - timerPenalty);
        timerEl.textContent = timerValue;
        answeredIncorrectly()
        startSequence(); 
    }
}
function answerC() {
    console.log('You Clicked : c');
    if (quizQuestions[randomNumber].correctAnswer == 'c') {
        answeredCorrectly()
        startSequence();  
    }else {
        timerValue = (timerValue - timerPenalty);
        timerEl.textContent = timerValue;
        answeredIncorrectly()
        startSequence(); 
    }
}
function answerD() {
    console.log('You Clicked : d');
    if (quizQuestions[randomNumber].correctAnswer == 'd') {
        answeredCorrectly()
        startSequence();  
    }else {
        timerValue = (timerValue - timerPenalty);
        timerEl.textContent = timerValue;
        answeredIncorrectly()
        startSequence(); 
    }
}

// When user starts the quiz, launch these functions
function startQuiz () {
    startSequence();
    startTimer();
    answerResultEl.textContent = "Timer Started, you have " + timerValue + " Seconds";
}

function init() {
    timerEl.style.color = "#00adb5";
};

init();

// eventListeners for when user clicks in page
startBtnEl.addEventListener('click',startQuiz);
submitBtnEl.addEventListener('click',showHighScores);
goBackBtnEl.addEventListener('click',restartQuiz);
clearScoresBtnEl.addEventListener('click',clearScores);

answerAEl.addEventListener('click', answerA);
answerBEl.addEventListener('click', answerB);
answerCEl.addEventListener('click', answerC);
answerDEl.addEventListener('click', answerD);