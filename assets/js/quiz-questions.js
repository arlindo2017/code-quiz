// list of questions for the quiz that will be used in quiz.js
var quizQuestions = [
{
    question: "Inside which HTML element do we put the JavaScript within out HTML?", 
    answers: {
        a:"<hack></hack>",
        b:"<script></script>",
        c:"<js></js>",
        d:"<javascript></javascript>"
    },
    correctAnswer:'b'
    },
    {
    question: 'How do you call a function named "myFunction"?', 
    answers: {
        a:'call function myFunction()',
        b:'call myFunction()',
        c:'myFunction()',
        d:'1800 myFunction'
    },
    correctAnswer:'c'
    },
    {
    question:  "Where is the correct place to insert a JavaScript?",
    answers: {
        a:"The <body> section",
        b:"Both the <head> and the <body> section are correct",
        c:"The <head> section",
        d:"Inside the .css file"
    },
    correctAnswer:'b'
    },
    {
    question:  "A very helpful debugging tool is",
    answers: {
        a:"console.log();",
        b:"function{}",
        c:"for loops",
        d:"Random.math()"
        },
    correctAnswer:'a'
    },
    {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: {
        a:'<script href= "xxx.js">',
        b:'<script link= "xxx.js">',
        c:'<script name= "xxx.js">',
        d:'<script src= "xxx.js">'
    },
    correctAnswer:'d'
    },
    {
    question: 'How do you write "Hello World" in an alert box?',
    answers: {
        a:'msgBox("Hello World");',
        b:'msg("Hello World");',
        c:'alert("Hello World");',
        d:'alertBox("Hello World");'
    },
    correctAnswer:'c'
    },
    {
    question: 'How do you create a function in JavaScript?',
    answers: {
        a:'function: myFunction()',
        b:'function myFunction()',
        c:'functionName myFunction()',
        d:'function = myFunction();'
    },
    correctAnswer:'b'
    },
    {
    question: 'What is the correct syntax for declaring a variable in JavaScript?',
    answers: {
        a:'var x;',
        b:'variable x;',
        c:'x = variable;',
        d:'#x = variable;'
    },
    correctAnswer:'a'
    },
    {
    question: 'What is the purpose of the "document.getElementById" function?',
    answers: {
        a:'To get the value of an element',
        b:'To set the value of an element',
        c:'To retrieve an element by its ID',
        d:'To change the style of an element'
    },
    correctAnswer:'c'
    },
    {
    question: 'What is the difference between let and var in JavaScript?',
    answers: {
        a:'var is global while let is local',
        b:'let is global while var is local',
        c:'var is for numbers and let is for strings',
        d:'let is for numbers and var is for strings'
    },
    correctAnswer:'a'
    },
    {
    question: 'What is the correct syntax for an if-else statement in JavaScript?',
    answers: {
        a:'if x = true then else',
        b:'if(x == true) else;',
        c:'if(x === true) { } else { }',
        d:'if x == true then else'
    },
    correctAnswer:'c'
    },
    {
    question: 'How do you add an element to an array in JavaScript?',
    answers: {
        a:'array.add(element)',
        b:'array.push(element)',
        c:'array(element)',
        d:'array + element'
    },
    correctAnswer:'b'
    },
    {
    question: 'How do you remove the last element of an array in JavaScript?',
    answers: {
        a:'array.pop()',
        b:'array.remove()',
        c:'array.delete()',
        d:'array.shift()'
    },
    correctAnswer:'a'
    },
    {
    question: 'What is the syntax for a for loop in JavaScript?',
    answers: {
        a:'for i = 0 to array.length',
        b:'for (i in array)',
        c:'for (var i = 0; i < array.length; i++)',
        d:'for i = 0 to array.length step 1'
    },
    correctAnswer:'c'
    },
    {
    question: 'What is the syntax for a while loop in JavaScript?',
    answers: {
        a:'while i < array.length',
        b:'while (i <= array.length)',
        c:'while array.length > i',
        d:'while (condition) { }'
    },
    correctAnswer:'d'
    },
    {
    question: 'How do you check if a variable is undefined in JavaScript?',
    answers: {
        a:'if (variable === undefined)',
        b:'if (typeof variable === "undefined")',
        c:'if (variable == "undefined")',
        d:'if (variable = undefined)'
    },
    correctAnswer:'b'
    }
    
        
];

//makes this variable global so it can be used in other javascripts
//Important this file must load in the HTML before the other files using it
window.quizQuestions = quizQuestions;