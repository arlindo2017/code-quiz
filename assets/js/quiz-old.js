// identify elements in the HTML page that will be modified
var timerEl = document.getElementById('timer');
var gameStatusEl = document.getElementById('game-status');
var questionEl = document.getElementById('quiz-header');
var startBtnEl = document.getElementById('start-btn');
var answerResultEl = document.getElementById('answer-results');
var answersEl = document.querySelectorAll('buttons');
var introEl = document.getElementById('intro');
var answer1 = document.getElementById('option-1');
var answer2 = document.getElementById('option-2');
var answer3 = document.getElementById('option-3');
var answer4 = document.getElementById('option-4');

// creates a unique random number from the quiz-questions.js
var usedAnswers = [];
var randomNumber;

function generateRandomQuestion() {
    randomNumber = Math.floor(Math.random() * quizQuestions.length);
    while (usedAnswers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random()* quizQuestions.length);
    }
    usedAnswers.push(randomNumber);
    console.log("Random generated number : " + randomNumber);
    return randomNumber;
}
// sets question number sequence
var quizNumber = 1;

// top scores - need to implement
var highScores = {
    initials:[],    
    score:[]
};


// Timer values
var initialTimer = 100;
var timerPenalty = 10;
var timerValue = initialTimer;
var gameStatus = false;

//Inital Values rendered in the HTML
timerEl.textContent = timerValue;
gameStatusEl.textContent = false;

//timer
function startTimer() {
    var intervalId = setInterval(function() {
        timerValue--;
        timerEl.textContent = timerValue;
    
        if (timerValue === 0 && gameStatus === true) {
            clearInterval(intervalId);
            gameStatus = false;
            timerValue = initialTimer; // Reset timerValue to the initialTimer value
            
            hideAnswers();
            questionEl.textContent = "Time ran out, your score is : 0";
            gameStatusEl.textContent = gameStatus;
            startBtnEl.style.visibility = "visible";
        // } else if (timerValue < 0 && gameStatus === false) {
        //     clearInterval(intervalId);
        //     timerValue = initialTimer;
        }
    }, 1000);
}



// list of Questions printed to the buttons
function questionList() {
   // console.log("Question: " + (quizNumber) + " of " + (quizQuestions.length)); 

    questionEl.textContent = quizQuestions[randomNumber].question;
    answer1.textContent = "a) - " + quizQuestions[randomNumber].answers['a'];
    answer2.textContent = "b) - " + quizQuestions[randomNumber].answers['b'];
    answer3.textContent = "c) - " + quizQuestions[randomNumber].answers['c'];
    answer4.textContent = "d) - " + quizQuestions[randomNumber].answers['d'];
    quizNumber++;   
             
}   

// sets a limit on the number of questions
function questionSequence() {
    if (quizNumber <= quizQuestions.length) {
        generateRandomQuestion();
        questionList(); 
    } else if (quizNumber > quizQuestions.length) {
        clearInterval(intervalId);
        gameStatus = false;
        gameStatusEl.textContent = gameStatus;
        results(); 
    }
}

function results() {
    questionEl.textContent = "End of Questions\nYour Final Score : " + timerValue;
    hideAnswers();
    gameStatus = false;
    startBtnEl.style.visibility = "visible";
}


function startSequence() {
    timerValue = initialTimer;
    startTimer(); 
    generateRandomQuestion();
    questionList() 
    //questionSequence();
    showAnswers();
    
    gameStatus = true;
    
    startBtnEl.style.visibility = "hidden";
    introEl.style.visibility = "hidden"; 
    
    timerEl.textContent = initialTimer;
    gameStatusEl.textContent = gameStatus;
    //console.log("Game Status : " + gameStatus);
}

function showAnswers() {
    answer1.style.visibility = "visible";
    answer2.style.visibility = "visible";
    answer3.style.visibility = "visible";
    answer4.style.visibility = "visible";    
}

function hideAnswers() {
    answer1.style.visibility = "hidden";
    answer2.style.visibility = "hidden";
    answer3.style.visibility = "hidden";
    answer4.style.visibility = "hidden";
}

function answerA() {
    if (quizQuestions[randomNumber].correctAnswer == 'a') {
        answerResultEl.textContent = "Correct."
        questionSequence();
        
    }else if (quizQuestions[randomNumber].correctAnswer !== 'a') {
        //clearInterval(intervalId);
        initialTimer = (initialTimer - timerPenalty);
        
        startTimer();
        timerEl.textContent = initialTimer;
        answerResultEl.textContent = "Incorrect, -" + timerPenalty + " was deducted from your time.";
        questionSequence();
    }
        
    
}
function answerB() {
    questionSequence();
    console.log('b');
}
function answerC() {
    questionSequence();
    console.log('c');
}
function answerD() {
    questionSequence();
    console.log('d');
}

// eventListeners for when user clicks in page
startBtnEl.addEventListener('click',startSequence);
answer1.addEventListener('click', answerA);
answer2.addEventListener('click', answerB);
answer3.addEventListener('click', answerC);
answer4.addEventListener('click', answerD);