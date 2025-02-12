interface IQuestion{
    question: string;
    choices: string[];
    correctAnswer: string;
}

class Quiz{
    protected questions: IQuestion[] = [];
    protected currentQuestion: number = 0;
    protected score: number = 0;

    constructor(questions: IQuestion[]){
        this.questions = questions;
    }

    getCurrentQuestion(): IQuestion{
        return this.questions[this.currentQuestion];
    }

    checkAnswer(answer: string): boolean{
        const isCorrect = this.questions[this.currentQuestion].correctAnswer === answer;
        if(isCorrect) this.score++;
        return isCorrect;
    }

    nextQuestion(): boolean{
        if(this.currentQuestion < this.questions.length - 1){
            this.currentQuestion++;
            return true;
        }
        return false;
    }

    getScore(): number{
        return this.score;
    }
}

const questionDisplay = document.getElementById('question-display');
const choices = document.getElementById('choices-container');
const nextButton = document.getElementById('next-button');
const score = document.getElementById('score-display');

const questions: IQuestion[] = [
    { question: "What is the square root of 64?", choices: ["6", "8", "10"], correctAnswer: "8" },
    { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter"], correctAnswer: "Mars" },
    { question: "Who wrote 'Hamlet'?", choices: ["William Shakespeare", "Charles Dickens", "Mark Twain"], correctAnswer: "William Shakespeare" },
    { question: "What is the chemical symbol for Gold?", choices: ["Au", "Ag", "Pb"], correctAnswer: "Au" }
];

const quiz: Quiz = new Quiz(questions);

function loadQuestion(){
    const currentQuestion = quiz.getCurrentQuestion();
    questionDisplay!.textContent = currentQuestion.question;

    choices!.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.className = "btn btn-outline-primary";
        button.addEventListener('click' , ()=> {
            quiz.checkAnswer(choice);
            score!.textContent = `Score: ${quiz.getScore()}`;
            goToNext();
        })
        choices!.appendChild(button);
    })
}

function goToNext(){
    if (quiz.nextQuestion()) {
        loadQuestion(); 
    } else {
        questionDisplay!.textContent = "Quiz Completed!";
        choices!.innerHTML = "";
        nextButton!.style.display = "none";
    }
}

nextButton!.addEventListener('click' , ()=>{
    goToNext();
})

loadQuestion();