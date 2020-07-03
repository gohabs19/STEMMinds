let questions=['Which of these shapes is not possible from this net?'];
let images=['1.jpg'];
let choices=[['a', 'b', 'c', 'd']];
let answers=['c'];//Correct answers to each question
let choiceElements=[0,0,0,0];//Prefilled with 4 slots. We know each question has 4 choices.
let button=[0,0,0,0];//Prefilled with 4 slots. We know each question has 4 choices, meaning that there are 4 buttons to be pressed.

function genQuestion(){
    let i = 0;
    
    randomQuestionIndex = Math.floor(Math.random() * questions.length);
    
    questionElement = document.createElement('td');
    questionElement.innerHTML = questions[randomQuestionIndex]; //Randomly selected question.
    document.getElementById('question').appendChild(questionElement);
    
    document.getElementById('image').src=images[randomQuestionIndex];
    
    while ( i < choices[randomQuestionIndex].length ){
        choiceElements[i] = document.createElement('button');//Create button
        choiceElements[i].innerHTML = choices[randomQuestionIndex][i]; //Randomly selected question.
        button[i]=document.getElementById('answers' + i).appendChild(choiceElements[i]);//Append button to answers elements in HTML
        button[i].id=String.fromCharCode(i+97);//Create character for ascii value
        button[i].onclick = function() {correctOrIncorrect(answers[randomQuestionIndex], this.id)};//On click, we compare answer to ID to see whether the answer was correct or incorrect
        i++;
    }
}

function correctOrIncorrect(correctAnswer, id){//Checks if the button that has been pressed is the correct or incorrect choice
    //console.log(correctAnswer, ' ', id);
    
    if (correctAnswer===id) {//Show that this is the correct answer
        console.log("Correct");
    }
    else {//Show that this is the incorrect answer
        console.log("Wrong")
    }
}

genQuestion();
