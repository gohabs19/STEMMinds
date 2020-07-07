let questions=['Which of these shapes is not possible from this net?', 'What is the answer to this question?'];
let questionIndex = 0;//Starting question index value.
let answers=['',''];//To keep track of the answers the users have given.

function genQuestion(){
    questionElement = document.createElement('td');
    questionElement.innerHTML = questions[questionIndex]; //Randomly selected question.
    document.getElementById('question').appendChild(questionElement);
    
    textBox=document.createElement('input');
    document.getElementById('textBox').appendChild(textBox);
    
    nextQuestion(questionElement, textBox);//Run the next question function
}

function nextQuestion(questionElement, textBox) {
    if (questionIndex<questions.length-1) {//For all questions that are not the last question of the quiz.
        nextQuestionButton=document.createElement('button');//Create button for next page
        nextQuestionButton.innerHTML='Next Question';//Change the contents of the next question button to say next question.
        document.getElementById('nextQuestion').appendChild(nextQuestionButton);//Create button for next page.
        document.getElementById('nextQuestion').onclick = function() {//Move on to next question when this button is clicked.
            console.log('Random Question Index: '+questionIndex);
            answers[questionIndex]=textBox.value;
            console.log('Answers: '+answers);
            questionElement.remove();//Remove question element, so that current question does not show the last question.
            textBox.remove();//Remove text box element, so that current question does not show the last text box.
            nextQuestionButton.remove();//Remove previous next question button, so that current question does not show the last one.
            questionIndex++;//Continue to next question.
            genQuestion();
        };
    }
    else {//For the last question of the quiz.
        endQuizButton=document.createElement('button');//Create button for next page
        endQuizButton.innerHTML='End Quiz';//Change the contents of the end quiz button to say end quiz.
        document.getElementById('nextQuestion').appendChild(endQuizButton);//Create button for the end of the quiz.
        document.getElementById('nextQuestion').onclick = function() {//Finish quiz when this button is clicked.
            answers[questionIndex]=textBox.value;
            console.log('Answers: '+answers);
            //We will decide later what happens on this event.
            //Potential ideas:
            //-Close the window
            //-Take to window that says thank you for completing the quiz
        };
    }
}

genQuestion();
