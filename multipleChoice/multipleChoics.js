let questions = ['is it sunny or cloudy?', 'is Jack a good boy?'];
let answers0 = ['sunny', 'cloudy'];
let answers1 = ['yes', 'yes, definitely', 'no qwestion'];
let answers2 = [];
let answers = [answers0, answers1, answers2];
let questionElement;

function genQuestion(){
    let i = 0;

    randomQuestionIndex = Math.floor(Math.random() * questions.length);
    let currentQuestion = questions[randomQuestionIndex];

    questionElement = document.createElement('td');
    questionElement.innerHTML = currentQuestion; //Randomly selected question.
    document.getElementById('question').appendChild(questionElement);

    while ( i < answers[randomQuestionIndex].length ){

        questionElement = document.createElement('button');
        questionElement.innerHTML = answers[randomQuestionIndex][i]; //Randomly selected question.
        document.getElementById('answers' + i).appendChild(questionElement);

        i++;
    }
}

genQuestion();