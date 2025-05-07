document.addEventListener('DOMContentLoaded', function() { //when al HTML and CSS are completely parsed
    const questions = [
        {
            question: "Which is the largest continent by area?",
            answers:[
                {text: "Africa", correct: false},
                {text: "Asia", correct: true},
                {text: "Europe", correct: false},
                {text: "North America", correct: false},
            ]
        },
        {
            question: "Which is the capital of Canada?",
            answers:[
                {text: "Toronto", correct: false},
                {text: "Vancouver", correct: false},
                {text: "Ottawa", correct: true},
                {text: "Montreal", correct: false},
            ]
        },
        {
            question: "Which river is known as the longest river in the world?",
            answers:[
                {text: "Nile", correct: true},
                {text: "Amazon", correct: false},
                {text: "Yangtze", correct: false},
                {text: "Ganges", correct: false},
            ]
        },
        {
            question: "Mount Everest is located in which mountain range?",
            answers:[
                {text: "Alps", correct: false},
                {text: "Andes", correct: false},
                {text: "Rockies", correct: false},
                {text: "Himalayas", correct: true},
            ]
        },
        {
            question: "Which ocean is the largest in the world?",
            answers:[
                {text: "Atlantic Ocean", correct: false},
                {text: "Indian Ocean", correct: false},
                {text: "Pacific Ocean", correct: true},
                {text: "Arctic Ocean", correct: false},
            ]
        },
        {
            question: "In which city is the Golden Gate Bridge located?",
            answers:[
                {text: "Los Angeles", correct: false},
                {text: "San Franciso", correct: true},
                {text: "San Diego", correct: false},
                {text: "Sacramento", correct: false},
            ]
        },
        {
            question: "Which two U.S. states do not share a border with any other state?",
            answers:[
                {text: "Hawaii and Alaska", correct: true},
                {text: "Hawaii and Maine", correct: false},
                {text: "Alaska and Washington", correct: false},
                {text: "Maine and Florida", correct: false},
            ]
        },
        {
            question: "Which is the largest island in the world?",
            answers:[
                {text: "Greenland", correct: true},
                {text: "New Guinea", correct: false},
                {text: "Borneo", correct: false},
                {text: "Madagascar", correct: false},
            ]
        },
        {
            question: "The Great Barrier Reef is located off the coast of which country?",
            answers:[
                {text: "New Zealand", correct: false},
                {text: "Indonesia", correct: false},
                {text: "South Africa", correct: false},
                {text: "Australia", correct: true},
            ]
        },
        {
            question: "Which is the longest mountain range in the world?",
            answers:[
                {text: "Andes", correct: true},
                {text: "Rockies", correct: false},
                {text: "Himalayas", correct: false},
                {text: "Mid-Atlantic Ridge", correct: false},
            ]
        },
        {
            question: "Which city is famously known as The Eternal City?",
            answers:[
                {text: "Paris", correct: false},
                {text: "Cairo", correct: false},
                {text: "Athen", correct: false},
                {text: "Rome", correct: true},
            ]
        },
        {
            question: "What is the capital of Brazil?",
            answers:[
                {text: "Rio de Janeiro", correct: false},
                {text: "Sao Paulo", correct: false},
                {text: "Brasilia", correct: true},
                {text: "Porto Alegre", correct: false},
            ]
        }
    ];

    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
    const startButton = document.getElementById("start-btn");
    const startScreen = document.querySelector(".start-screen");
    const quizScreen = document.querySelector(".quiz-screen");

    let currentQuestionIndex = 0; //question index
    let score = 0; //score to maintain the overall score of the quiz

    startButton.addEventListener("click", beginQuiz); //after clicking on the start button the quiz begins

    function beginQuiz() {
        startScreen.style.display = "none";
        quizScreen.style.display = "block";
        startQuiz();
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.style.display = "none";
        showQuestion();
    }

    function showQuestion() {
        resetState(); //the state resets back from the beginning
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

        currentQuestion.answers.forEach(answer => { //loops through each answer in the current question
            const button = document.createElement("button"); //creates a new button element
            button.textContent = answer.text; //puts the answer text inside the button------textContent/innerHTML - either can be used here
            button.classList.add("btn"); //applies all the button styles from css
            button.addEventListener("click", () => selectAnswer(answer.correct)); //selectAnswer() - when clicked tells whether this answer is correct or not
            //()=> preserves the correct value for this specific answer
            //asnwer.correct - is true/false from our questions array
            answerButtons.appendChild(button); //puts the finished button inside answer-buttons------makes it visible to the user
        });
    }

    function resetState() {
        while (answerButtons.firstChild) { //starts a loop as long as there is atleast one child element inside answerButtons
            //firstChild refers to the first element insdie the answer buttons container
            answerButtons.removeChild(answerButtons.firstChild); //removes the first child element from answerButtons
        }
        nextButton.style.display = "none"; //hides the next button
    }

    function selectAnswer(isCorrect) {
        if (isCorrect) { //if answer is correct then increase the score
            score++;
        }
        Array.from(answerButtons.children).forEach(button => { //converts the collection of answer buttons into an array and loops throught each answer button to modify its state
            button.disabled = true; //disables all answer buttons after one is selected
            if (button.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text) { //finds the correct answer
                //find(a=>a.correct) locates the answer object where correct: true
                button.classList.add("correct"); //if button is correct then adds the green color of this class
            } else if (!isCorrect && button.textContent === questions[currentQuestionIndex].answers.find(a => a.text === button.textContent).text) {
                button.classList.add("incorrect");
            }
        });
        nextButton.style.display = "block";
    }

    nextButton.addEventListener("click", () => {
        currentQuestionIndex++; //increments the question number
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    });

    function showScore() {
        resetState();
        questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
        nextButton.textContent = "Play Again";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", startQuiz, { once: true });
        //{once:true} - automatically removes listener after one use
    }
});