let questions = ['Which cube can NOT be created from the following net?: ', 'Which square is the same as the first one'];
let questionImages = ['images/overallNet.png', 'images/stemSquare1.png'];
let answers0 = ['stemCube1', 'stemCube2', 'stemCube3','stemCube4'];
let answers1 = ['stemSquare2', 'stemSquare3', 'stemSquare4', 'stemSquare5'];
//let answers2 = ['yes', 'no, I would rather focus on the code itself', 'i\'m not interested in the code at all, only the financial part!'];
let answers = [answers0, answers1];//, answers2];
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
    document.getElementById('questionImages').src = questionImages[randomQuestionIndex];
    while ( i < answers[randomQuestionIndex].length ){
        //alert(answers[randomQuestionIndex][i]);
        document.getElementById('answers' + i).src = 'images/'+answers[randomQuestionIndex][i]+'.png';
        document.getElementById('answers' + i).onclick = function(){
            askedAnswers[j] = this.innerHTML;
            askedQuestions[j] = currentQuestion;

            //alert(this.innerHTML);
            if (j < 1){
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