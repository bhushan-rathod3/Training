var Quiz = /** @class */ (function () {
    function Quiz(questions) {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = questions;
    }
    Quiz.prototype.getCurrentQuestion = function () {
        return this.questions[this.currentQuestion];
    };
    Quiz.prototype.checkAnswer = function (answer) {
        var isCorrect = this.questions[this.currentQuestion].correctAnswer === answer;
        if (isCorrect)
            this.score++;
        return isCorrect;
    };
    Quiz.prototype.nextQuestion = function () {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            return true;
        }
        return false;
    };
    Quiz.prototype.getScore = function () {
        return this.score;
    };
    return Quiz;
}());
var questionDisplay = document.getElementById('question-display');
var choices = document.getElementById('choices-container');
var nextButton = document.getElementById('next-button');
var score = document.getElementById('score-display');
var questions = [
    { question: "What is the square root of 64?", choices: ["6", "8", "10"], correctAnswer: "8" },
    { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter"], correctAnswer: "Mars" },
    { question: "Who wrote 'Hamlet'?", choices: ["William Shakespeare", "Charles Dickens", "Mark Twain"], correctAnswer: "William Shakespeare" },
    { question: "What is the chemical symbol for Gold?", choices: ["Au", "Ag", "Pb"], correctAnswer: "Au" }
];
var quiz = new Quiz(questions);
function loadQuestion() {
    var currentQuestion = quiz.getCurrentQuestion();
    questionDisplay.textContent = currentQuestion.question;
    choices.innerHTML = "";
    currentQuestion.choices.forEach(function (choice) {
        var button = document.createElement("button");
        button.textContent = choice;
        button.className = "btn btn-outline-primary";
        button.addEventListener('click', function () {
            quiz.checkAnswer(choice);
            score.textContent = "Score: ".concat(quiz.getScore());
            goToNext();
        });
        choices.appendChild(button);
    });
}
function goToNext() {
    if (quiz.nextQuestion()) {
        loadQuestion();
    }
    else {
        questionDisplay.textContent = "Quiz Completed!";
        choices.innerHTML = "";
        nextButton.style.display = "none";
    }
}
nextButton.addEventListener('click', function () {
    goToNext();
});
loadQuestion();
