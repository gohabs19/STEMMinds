let questions = ['Which would be your first choice of activity?: ', 'Would you rather build a bridge, or make an app?', 'are you interested in business, and how to sell the things you\'ve built?', 'How do you/your child typically respond when faced with a challenge?'];
let answers0 = ['photography', 'movie creation', 'coding'];
let answers1 = ['bridge', 'app', 'neither'];
let answers2 = ['yes', 'no, I would rather focus on the code itself', 'i\'m not interested in the code at all, only the financial part!'];
let answers3 = ['Work through it independently', 'work through it with support', 'Struggle to ask for help'];
let answers = [answers0, answers1, answers2, answers3];
let questionElement;
let answerElement = [];

let askedQuestions = [];
let askedAnswers = [];
let j = 0;

function genQuestion(){
    let i = 0;
    let k = 0;
    let answer;

    randomQuestionIndex = Math.floor(Math.random() * questions.length);
    let currentQuestion = questions[randomQuestionIndex];

    while (askedQuestions.includes(currentQuestion)){
        randomQuestionIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomQuestionIndex];
    }

    document.getElementById('question').innerHTML = currentQuestion; //Randomly selected question.

    while ( i < answers[randomQuestionIndex].length ){
        document.getElementById('answers' + i).innerHTML = answers[randomQuestionIndex][i];
        document.getElementById('answers' + i).onclick = function(){
            askedAnswers[j] = this.innerHTML;
            askedQuestions[j] = currentQuestion;

            //alert(this.innerHTML);
            if (j < 3){
                genQuestion();
            }
            j++;
        }
        
        i++;
    }

    /*i = 0;
    while (i < answers[randomQuestionIndex].length){
        answerElement[i].onclick = function(){
            askedAnswers[j] = this.innerHTML;
            askedQuestions[j] = currentQuestion;

            alert(this.innerHTML);

            genQuestion();
            j++;
        }
    }*/
}

genQuestion();