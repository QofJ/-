let questions = [];
let currentQuestion = null;

async function loadQuestions() {
    const response = await fetch('questions.txt');
    const text = await response.text();
    questions = text.split('\n\n').map(pair => {
        const [question, answer] = pair.split('\n');
        return { question, answer };
    });
    nextQuestion();
}

function nextQuestion() {
    if (questions.length === 0) return;
    const index = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[index];
    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('answer').style.display = 'none';
    document.getElementById('answer').textContent = '';
}

document.getElementById('show-answer').addEventListener('click', () => {
    if (currentQuestion) {
        document.getElementById('answer').textContent = currentQuestion.answer;
        document.getElementById('answer').style.display = 'block';
    }
});

document.getElementById('next-question').addEventListener('click', nextQuestion);

loadQuestions();
