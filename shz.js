// Questions array
const questions = [
  {
    question: "Commonly used data types DO NOT include",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "numbers"
  },
  {
    question: "The condition in an if / else statement is enclosed within ___.",
    choices: ["quotes", "curly brackets", "parentheses", "square branches"],
    correctAnswer: "parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store ___.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above"
  },
  {
    question: "String values must be enclosed within ___ when being assigned to variables.",
    choices: ["JavaScript", "terminal/bash", "for leaps", "console.log"],
    correctAnswer: "JavaScript"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "parentheses"
  },



  // Add more questions...
];

let currentQuestion = 0; // Index of the current question
let timeLeft = 45; // Initial time left
let timerInterval; // Reference to the timer interval
let score = 0
document.getElementById("score-form").style.display = "none";

// Start button event listener
document.getElementById("start-button").addEventListener("click", startQuiz);

// Next button event listener

// Score form event listener
document.getElementById("score-form").addEventListener("submit", saveScore);

// Function to start the quiz
function startQuiz() {
  document.getElementById("start-button").style.display = "none";

  createOptions()
  timerInterval = setInterval(updateTimer, 1000);

  displayQuestion(currentQuestion);
}

// Function to display the current question
function displayQuestion(index) {
  const question = questions[index];

  document.getElementById("question").textContent = question.question;
  var optionslist = document.querySelectorAll(".options")
  for (let i = 0; i < 4; i++) {
    optionslist[i].textContent = question.choices[i]
  }
}
function createOptions() {
  const choicesList = document.getElementById("choices");
  choicesList.innerHTML = "";

  for (let i = 0; i < 4; i++) {
    const li = document.createElement("li");
    li.classList.add("options")

    li.addEventListener("click", answerQuestion);

    choicesList.appendChild(li);
  }
}

// Function to handle the answer selection
function answerQuestion(event) {
  const selectedChoice = event.target.textContent;
  const question = questions[currentQuestion];

  if (selectedChoice === question.correctAnswer) {
    // Correct answer
    // Add your code here for correct answer behavior
    score += 5
    document.getElementById("answer").textContent = "Correct!!!"
  } else {
    // Incorrect answer
    // Add your code here for incorrect answer behavior
    timeLeft -= 3
    document.getElementById("answer").textContent = "INCORRECT!!!"
  }
  setTimeout(function () {

    nextQuestion();
  }, 1000)
}

// Function to move to the next question
function nextQuestion() {
  currentQuestion++;
  document.getElementById("answer").textContent = ""
  if (currentQuestion < questions.length) {
    displayQuestion(currentQuestion);
  } else {
    gameOver();

  }
}

// Function to end the game
function gameOver() {
  clearInterval(timerInterval);

  document.getElementById("question").textContent = "Game Over";
  document.getElementById("choices").innerHTML = "";
  document.getElementById("answer").textContent = ""
  document.getElementById("score-form").style.display = "block";
}

// Function to update the timer
function updateTimer() {
  timeLeft--;
  document.getElementById("time").textContent = timeLeft;

  if (timeLeft <= 0) {
    gameOver();
  }
}

// Function to save the score
function saveScore(event) {
  event.preventDefault();

  const initials = document.getElementById("initials").value;
  const score = timeLeft;

  // Add your code here to save the initials and score
  var dashboard = JSON.parse(localStorage.getItem("CodeQuiz")) || [] // || or
  dashboard.push({
    user: initials, score: score
  })
  localStorage.setItem("CodeQuiz", JSON.stringify(dashboard))
  var listelement = document.getElementById("listofscores")
  for (let i = 0; i < dashboard.length; i++) {
    let li = document.createElement("li")
    li.textContent = dashboard[i].user + "      ----      " + dashboard[i].score
    listelement.appendChild(li)

  }
  document.getElementById("score-form").style.display = "none";
}