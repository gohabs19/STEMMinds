let questions=['Which of these shapes is not possible from this net?'];
let images=['1.jpg'];
let choices=[['a', 'b', 'c', 'd']];
let answers=['c'];//Correct answers to each question
let choiceElements=[0,0,0,0];//Prefilled with 4 slots. We know each question has 4 choices.
let answerButton=[0,0,0,0];//Prefilled with 4 slots. We know each question has 4 choices, meaning that there are 4 buttons to be pressed.
let answerCorrectness=[0];//Keeps track of which answers are correct and incorrect in order. 0 indicates an incorrect answer, and 1 indicates a correct answer.
let choiceMade=[0];//Keeps track of whether a choice has been made for each question. Once a choice has been made, a choice can no longer be made.
//0 indicates an no choice has been made, and 1 indicates a choice has been made.

function genQuestion(){
    let i = 0;//Used as a counter to create the options for the questions as buttons (e.g. button 'c').
    
    randomQuestionIndex = Math.floor(Math.random() * questions.length);
    
    questionElement = document.createElement('td');
    questionElement.innerHTML = questions[randomQuestionIndex]; //Randomly selected question.
    document.getElementById('question').appendChild(questionElement);
    
    document.getElementById('image').src=images[randomQuestionIndex];
    
    while ( i < choices[randomQuestionIndex].length ){
        choiceElements[i] = document.createElement('button');//Create button
        choiceElements[i].innerHTML = choices[randomQuestionIndex][i]; //Randomly selected question.
        answerButton[i]=document.getElementById('answers' + i).appendChild(choiceElements[i]);//Append button to answers elements in HTML
        answerButton[i].id=String.fromCharCode(i+97);//Create character for ascii value
        answerButton[i].onclick = function() {
            console.log("Choice Made: "+choiceMade[randomQuestionIndex]);
            if (choiceMade[randomQuestionIndex]===0) {//If a choice has already been made for this question (regardless of whether it is the correct or incorrect answer), the user can not
                //pick a new answer as a replacement.
                correctOrIncorrect(randomQuestionIndex, answers[randomQuestionIndex], this.id);//On click, we compare answer to ID to see whether the answer was correct or incorrect
                console.log("Correct Answer?: "+answerCorrectness[randomQuestionIndex]);
                if (answerCorrectness[randomQuestionIndex]===1) {//We display a green colour if correct answer chosen, red if incorrect chosen.
                    document.getElementById(this.id).style.background='#00FF00';//Green
                }
                else {
                    document.getElementById(this.id).style.background='#FF0000';//Red
                }
                //document.getElementById('nextQuestion').createElement('button');//Create button for next page
            }
        };
        i++;
    }
}

function correctOrIncorrect(randomQuestionIndex, correctAnswer, id){//Checks if the button that has been pressed is the correct or incorrect choice
    choiceMade[randomQuestionIndex]=1;
    if (correctAnswer===id) {//Show that this is the correct answer
        console.log("Correct");
        answerCorrectness[randomQuestionIndex]=1;
    }
    else {//Show that this is the incorrect answer
        console.log("Wrong");
        answerCorrectness[randomQuestionIndex]=0;
    }
}

genQuestion();
