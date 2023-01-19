// identify elements in the HTML page that will be modified
var timerEl = document.getElementById('timer');
var lastScoreEl = document.getElementById('last-score');
var quizHeaderEl = document.getElementById('quiz-header');
var answerResultEl = document.getElementById('answer-results');
var introEl = document.getElementById('intro');
var answerAEl = document.getElementById('option-a');
var quizOptionsEl = document.getElementById('quiz-options');
var submitScoresEl = document.getElementById('submit-scores');
var quizScoresEl = document.getElementById('quiz-scores');
var initialsEl = document.getElementById('initials');
//var scoresEl = document.getElementById("scores");


//Identify Buttons
var startBtnEl = document.getElementById('start-btn');
var submitBtnEl = document.getElementById('submit-btn');
var goBackBtnEl = document.getElementById('go-back-btn');
var clearScoresBtnEl = document.getElementById('clear-scores-btn');
var answerAEl = document.getElementById('option-a');
var answerBEl = document.getElementById('option-b');
var answerCEl = document.getElementById('option-c');
var answerDEl = document.getElementById('option-d');

// sets question number sequence
var quizNumber = 1;
var numberOfQuestions = 5;

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
lastScoreEl.textContent = localStorage.getItem("score");

// timer
// function startTimer() {
//     var intervalId = setInterval(function() {
//         timerValue--;
//         timerEl.textContent = timerValue;
    
//         if (timerValue === 0 && gameStatus === true) {
//             clearInterval(intervalId);
//             gameStatus = false;
//             timerValue = initialTimer; // Reset timerValue to the initialTimer value
            
//             hideAnswers();
//             questionEl.textContent = "Time ran out, your score is : 0";
//             gameStatusEl.textContent = gameStatus;
//             startBtnEl.style.visibility = "visible";
//         // } else if (timerValue < 0 && gameStatus === false) {
//         //     clearInterval(intervalId);
//         //     timerValue = initialTimer;
//         }
//     }, 1000);
// }



// list of Questions printed to the buttons
function showQuestionList() {
    console.log("Question # : " + (quizNumber) + " of " + (numberOfQuestions)); 

    quizHeaderEl.textContent = quizQuestions[randomNumber].question;
    answerAEl.textContent = "a) - " + quizQuestions[randomNumber].answers['a'];
    answerBEl.textContent = "b) - " + quizQuestions[randomNumber].answers['b'];
    answerCEl.textContent = "c) - " + quizQuestions[randomNumber].answers['c'];
    answerDEl.textContent = "d) - " + quizQuestions[randomNumber].answers['d'];  
    quizNumber++;          
}   

function startSequence() {
    // Action when game is out of questions
    if (quizNumber > numberOfQuestions) {
        console.log("Game Ended ....");
        showGameResults(); 
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

//different states of the game, to show or hide depending on the status
function showOutOfTime() {
    quizHeaderEl.textContent = "Clock ran out\nYour Final Score : " + timerValue;
    gameStatusFalse();
    localStorage.clear("scores");
    lastScoreEl.textContent = "";
}

function showGameResults() {
    submitScoresEl.style.visibility = "visible";
    quizHeaderEl.textContent = "End of Questions.\nEnter your initials and submit your scores of " + timerValue;
    gameStatusFalse();
}


function showHighScores(event) {
    event.preventDefault(); 
    quizHeaderEl.textContent = "Your Score."
    quizScoresEl.style.visibility = "visible";
    submitScoresEl.style.visibility = "hidden";
    
    var storedScores = localStorage.getItem("score");
    if (storedScores !== null) {
        localStorage.clear("scores");
        localStorage.setItem("score", initialsEl.value + " - "+ timerValue);
        quizHeaderEl.textContent =  "Your Score: " + localStorage.getItem("score");
        answerResultEl.textContent = "Score Updated.";
        console.log("score updated");
    }else {
        localStorage.setItem("score", initialsEl.value + " - "+ timerValue);
        quizHeaderEl.textContent =  "Your Score: " + localStorage.getItem("score");
        answerResultEl.textContent = "Score added.";
        console.log("Score added");
    }
          
}


function restartQuiz() {
    quizHeaderEl.textContent = "Click Start to try again!";
    timerValue = initialTimer;
    timerEl.textContent = timerValue;
    startBtnEl.style.visibility = "visible";
    introEl.style.visibility = "visible";
    quizScoresEl.style.visibility = "hidden";
    lastScoreEl.textContent = localStorage.getItem("score");
}

function clearScores() {
    console.log("Scores have been cleared.");
    localStorage.clear("scores");
    quizHeaderEl.textContent = "No Scores available";
    answerResultEl.textContent = "Scores Cleared"; 
}

// set visibility based on game status
function gameStatusTrue() {
    gameStatus = true;
    //gameStatusEl.textContent = gameStatus;
    startBtnEl.style.visibility = "hidden";
    introEl.style.visibility = "hidden"; 
    quizOptionsEl.style.visibility = "visible";
    submitScoresEl.style.visibility = "hidden";
    quizScoresEl.style.visibility = "hidden";
}

function gameStatusFalse() {
    gameStatus = false;
    //gameStatusEl.textContent = gameStatus;
    introEl.style.visibility = "hidden"; 
    quizOptionsEl.style.visibility = "hidden";
    answerResultEl.textContent = "";
}

// Buttons clicked by users
function answerA() {
    console.log('You Clicked : a');
    if (quizQuestions[randomNumber].correctAnswer == 'a') {
        answerResultEl.textContent = "Correct.";
        startSequence();  
    }else {
        timerValue = (timerValue - timerPenalty);
        timerEl.textContent = timerValue;
        answerResultEl.textContent = "Incorrect, -" + timerPenalty + " was deducted from your time.";
        startSequence(); 
    }
}

function answerB() {
    console.log('You Clicked : b');
    if (quizQuestions[randomNumber].correctAnswer == 'b') {
        answerResultEl.textContent = "Correct."
        startSequence();  
    }else {
        timerValue = (timerValue - timerPenalty);
        timerEl.textContent = timerValue;
        answerResultEl.textContent = "Incorrect, -" + timerPenalty + " was deducted from your time.";
        startSequence(); 
    }
}
function answerC() {
    console.log('You Clicked : c');
    if (quizQuestions[randomNumber].correctAnswer == 'c') {
        answerResultEl.textContent = "Correct."
        startSequence();  
    }else {
        timerValue = (timerValue - timerPenalty);
        timerEl.textContent = timerValue;
        answerResultEl.textContent = "Incorrect, -" + timerPenalty + " was deducted from your time.";
        startSequence(); 
    }
}
function answerD() {
    console.log('You Clicked : d');
    if (quizQuestions[randomNumber].correctAnswer == 'd') {
        answerResultEl.textContent = "Correct."
        startSequence();  
    }else {
        timerValue = (timerValue - timerPenalty);
        timerEl.textContent = timerValue;
        answerResultEl.textContent = "Incorrect, -" + timerPenalty + " was deducted from your time.";
        startSequence(); 
    }
}

// eventListeners for when user clicks in page
startBtnEl.addEventListener('click',startSequence);
submitBtnEl.addEventListener('click',showHighScores);
goBackBtnEl.addEventListener('click',restartQuiz);
clearScoresBtnEl.addEventListener('click',clearScores);


answerAEl.addEventListener('click', answerA);
answerBEl.addEventListener('click', answerB);
answerCEl.addEventListener('click', answerC);
answerDEl.addEventListener('click', answerD);