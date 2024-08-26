
const quizData = {
    science: [
        { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "HO"], answer: 1, feedback: "Correct! H2O is the chemical formula for water." },
        { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1, feedback: "Correct! Mars is called the Red Planet due to its reddish appearance." },
        { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Hg"], answer: 0, feedback: "Correct! The answer is Au." },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"], answer: 2, feedback: "Correct! The answer is Mitochondria." },
        { question: "Water boils at what temperature on the Celsius scale?", options: ["50°C", "75°C", "100°C", "150°C"], answer: 3, feedback: "Correct! The answer is100°C ." }
    ],
    health: [
        { question: "Which vitamin is essential for calcium absorption?", options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin B12"], answer: 1, feedback: "Correct! Vitamin D is vital for calcium absorption." },
        { question: "What is the average human body temperature?", options: ["37°C", "40°C", "35°C", "39°C"], answer: 0, feedback: "Correct! The average body temperature is 37°C." },
        { question: "Which food group provides protein to the body?", options: ["Dairy", "Grains", "Vegetables", "Meat and Beans"], answer: 3, feedback: "Correct! The Meat and The Beans." },
        { question: "What type of exercise improves flexibility?", options: ["Yoga", "Running", "Weightlifting", "Swimming"], answer: 0, feedback: "Correct! The answer is Yoga." },
        { question: "Which food is high in antioxidants?", options: ["Broccoli", "Blueberries", "Chicken", "Pasta"], answer: 1, feedback: "Correct! The answer is Blueberries." }
    ],
    history: [
        { question: "When did World War II end?", options: ["1941", "1943", "1945", "1947"], answer: 2, feedback: "Correct! World War II ended in 1945." },
        { question: "In which year did World War I begin?", options: ["1914", "1917", "1939", "1941"], answer: 0, feedback: "Correct! The answer is 1914." },
        { question: "Which empire was ruled by Julius Caesar?", options: ["Byzantine Empire", "Holy Roman Empire", "Roman Empire", "Ottoman Empire"], answer: 2, feedback: "Correct! The answer is Roman Empire." },
        { question: "Who is known as the 'Father of the Indian Nation'?", options: ["Jawaharlal Nehru", "Bhagat Singh", "Mahatma Gandhi", "Sardar Patel"], answer: 2, feedback: "Correct!The answer Mahatma Gandhi ." },
        { question: "Who was the first Indian woman to become the President of India?", options: ["Sarojini Naidu", "Pratibha Patil", "Indira Gandhi", "Sushma Swaraj"], answer: 1, feedback: "Correct! The answer is Pratibha Patil." }
    ],
    mathematics: [
        { question: "What is the square root of 144?", options: ["10", "12", "14", "16"], answer: 1, feedback: "Correct! The square root of 144 is 12." },
        { question: "What is 25% of 200?", options: ["25", "50", "75", "100"], answer: 1, feedback: "Correct! 25% of 200 is 50." },
        { question: "What is the value of 5**3?", options: ["25", "15", "125", "100"], answer: 2, feedback: "Correct! The answer is 125." },
        { question: "If x+7=15x+7=15, what is the value of x?", options: ["7", "8", "9", "15"], answer: 1, feedback: "Correct! The answer is 8." },
        { question: "What is the value of 2x+3=112x+3=11?", options: ["2", "4", "6", "8"], answer: 1, feedback: "Correct! The answer is 4." }
    ],
    programming: [
        { question: "Which language is primarily used for web development?", options: ["Python", "C++", "JavaScript", "Java"], answer: 2, feedback: "Correct! JavaScript is widely used for web development." },
        { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Markup Language", "Hyperlink Markup Language", "HyperText Markdown Language"], answer: 0, feedback: "Correct! HTML stands for HyperText Markup Language." },
        { question: "Which of the following is used to declare a variable in JavaScript?", options: ["let", "var", "const", "All of the above"], answer: 3, feedback: "Correct! The aswer are All of the above." },
        { question: "In which language is the keyword class used to create a class?", options: ["Java", "HTML", "SQL", "CSS"], answer: 0, feedback: "Correct! The answer is Java." },
        { question: "What does the acronym HTTP stand for?", options: ["Hypertext Transfer Protocol", "Hypertext Transaction Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Protocol"], answer: 0, feedback: "Correct! The answer is Hypertext Transfer Protocol." }
    ]
};

let currentTopic = null;
let currentQuestionIndex = 0;
let score = 0;

function showHomePage() {
    document.getElementById('app').innerHTML = `
        <h1>Knowledge Quiz</h1>
        <p>Challenge your knowledge with quizzes on various topics. Select a topic to get started!</p>
        <button onclick="showTopicPage()">Start Quiz</button>
    `;
}

function showTopicPage() {
    const topics = Object.keys(quizData);
    const topicButtons = topics.map(topic => `
        <button onclick="startQuiz('${topic}')">${capitalizeFirstLetter(topic)}</button>
    `).join('');

    document.getElementById('app').innerHTML = `
        <h2>Select a Topic</h2>
        ${topicButtons}
        <button onclick="showHomePage()">Back to Home</button>
    `;
}

function startQuiz(topic) {
    currentTopic = topic;
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const questionData = quizData[currentTopic][currentQuestionIndex];
    const optionsHTML = questionData.options.map((option, i) => `
        <label>
            <input type="radio" name="question" value="${i}" onclick="handleAnswer(${i})"> ${option}
        </label><br>
    `).join('');

    document.getElementById('app').innerHTML = `
        <h2>${capitalizeFirstLetter(currentTopic)} Quiz</h2>
        <div class="question">
            <p>${questionData.question}</p>
            ${optionsHTML}
        </div>
        <button onclick="previousQuestion()">Previous</button>
        <button onclick="nextQuestion()">Next</button>
        <button onclick="submitQuiz()">Submit</button>
        <button onclick="showTopicPage()">Back to Topics</button>
        <div id="score-feedback"></div>
        <div id="detailed-feedback" class="feedback"></div>
        <div class="progress-bar"><div class="progress" id="progress-bar"></div></div>
    `;
    updateProgressBar();
}

function handleAnswer(selectedOption) {
    const correctAnswer = quizData[currentTopic][currentQuestionIndex].answer;
    const feedbackElement = document.getElementById('detailed-feedback');

    if (selectedOption == correctAnswer) {
        score++;
        document.querySelector(`input[name="question"][value="${selectedOption}"]`).parentElement.classList.add('correct');
    } else {
        document.querySelector(`input[name="question"][value="${selectedOption}"]`).parentElement.classList.add('wrong');
        feedbackElement.innerHTML += `Q${currentQuestionIndex + 1}: ${quizData[currentTopic][currentQuestionIndex].feedback}<br>`;
    }
}

function nextQuestion() {
    if (currentQuestionIndex < quizData[currentTopic].length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function submitQuiz() {
    document.getElementById('app').innerHTML = `
        <h2>Quiz Completed</h2>
        <p>Your score: ${score} out of ${quizData[currentTopic].length}</p>
        <button onclick="showTopicPage()">Back to Topics</button>
        <button onclick="showHomePage()">Back to Home</button>
    `;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / quizData[currentTopic].length) * 100;
    progressBar.style.width = `${progress}%`;
}



function previousQuestion() {
    console.log("Previous button clicked"); 
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


showHomePage();