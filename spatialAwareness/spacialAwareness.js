let questions=['Which of these shapes is not possible from this net?', 'What is the answer to this question?'];
let questionIndex = 0;
let images=['1.jpg','2.png'];
let choices=[['a', 'b', 'c', 'd'],['a', 'b', 'c', 'd']];
let answers=['c','a'];//Correct answers to each question
let answerCorrectness=[0,0];//Keeps track of which answers are correct and incorrect in order. 0 indicates an incorrect answer, and 1 indicates a correct answer.
let choiceMade=[0,0];//Keeps track of whether a choice has been made for each question. Once a choice has been made, a choice can no longer be made.
//0 indicates an no choice has been made, and 1 indicates a choice has been made.
let choiceElements=[0,0,0,0];//Prefilled with 4 slots. We know each question has 4 choices.
let answerButton=[0,0,0,0];//Prefilled with 4 slots. We know each question has 4 choices, meaning that there are 4 buttons to be pressed.

function genQuestion(){
    let i = 0;//Used as a counter to create the options for the questions as buttons (e.g. button 'c').
    
    questionElement = document.createElement('td');
    questionElement.innerHTML = questions[questionIndex]; //Randomly selected question.
    document.getElementById('question').appendChild(questionElement);
    
    document.getElementById('image').src=images[questionIndex];//Change image to image for set question
    
    while ( i < choices[questionIndex].length ){
        choiceElements[i] = document.createElement('button');//Create button
        choiceElements[i].innerHTML = choices[questionIndex][i]; //Randomly selected question.
        answerButton[i]=document.getElementById('answers' + i).appendChild(choiceElements[i]);//Append button to answers elements in HTML
        answerButton[i].id=String.fromCharCode(i+97);//Create character for ascii value
        answerButton[i].onclick = function() {
            console.log("Choice Made: "+choiceMade[questionIndex]);
            if (choiceMade[questionIndex]===0) {//If a choice has already been made for this question (regardless of whether it is the correct or incorrect answer), the user can not
                //pick a new answer as a replacement.
                correctOrIncorrect(questionIndex, answers[questionIndex], this.id);//On click, we compare answer to ID to see whether the answer was correct or incorrect
                console.log("Correct Answer?: "+answerCorrectness[questionIndex]);
                if (answerCorrectness[questionIndex]===1) {//We display a green colour if correct answer chosen, red if incorrect chosen.
                    document.getElementById(this.id).style.background='#00FF00';//Green
                }
                else {
                    document.getElementById(this.id).style.background='#FF0000';//Red
                }
                nextQuestion();//Run the next question function
            }
        };
        i++;
    }
}

function correctOrIncorrect(questionIndex, correctAnswer, id){//Checks if the button that has been pressed is the correct or incorrect choice
    choiceMade[questionIndex]=1;
    if (correctAnswer===id) {//Show that this is the correct answer
        console.log("Correct");
        answerCorrectness[questionIndex]=1;
    }
    else {//Show that this is the incorrect answer
        console.log("Wrong");
        answerCorrectness[questionIndex]=0;
    }
}

function nextQuestion() {
    let i=0;//Simple counter to reset choiceElements and answerButtons arrays after each question
    for (i=0; i<=3; i++) {//Reset these two arrays
        choiceElements[i]=0;
        answerButton[i]=0;
    }
    nextQuestionButton=document.createElement('button');//Create button for next page
    nextQuestionButton.innerHTML='Next Question';//Change the contents of the next question button to say next question.
    document.getElementById('nextQuestion').appendChild(nextQuestionButton);//Create button for next page
    document.getElementById('nextQuestion').onclick = function() {//Move on to next question when this button is clicked.
        questionIndex++;
        console.log('Random Question Index: '+questionIndex);
        //document.location.reload();//Refresh HTML
        genQuestion();
    };
}

genQuestion();
