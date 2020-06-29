document.getElementById("header").innerText = "Stem Minds Assessment Tool: Typing Test";

let promptText = '';
let textOrder = [];
let numPressed = 0;
let keyPressed;
let currentWord = 1;
prompt = document.getElementById("prompt");

let wordsCorrect = 0;
let wordsIncorrect = 0;
let interval;

let isTiming = false;

let timer = 0;
let accuracy;
let wpm;

let testLen = 0;

let numOfCodes;

function generatePrompt(){
    let currentLine = 0;
    let random;
    //let words = ['this', 'hello', 'for', 'while', 'let', 'console', 'if', 'else', ';', 'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'her', 'she'];
    let code0 = ["function", "startTime(){",
        "br", "tab", "if", "(isTiming", "==", "false){",
        "br", "tab", "tab", "interval", "=", "setInterval","(function(){", "timer", "+=", "0.1}", "100);",
        "br", "tab", "isTiming", "=", "true;",
        "br", "}}"];

    let code1 = ["if", "(keyPressed", "==", 'true){',
            "br", "tab", "checkWord();",
            "br", "tab", "document.value", '=', 'null;',
        'br', '}'];

    let code2 = ['sharks', '=', '[\'hammerhead\',', '\'great', 'white\']',
                'br','for', 'item', 'in', 'range(len(sharks)):',
                    'br', 'tab', 'sharks.append(\'shark\')',
                'br', 'print(sharks)']

    let codeSnippets = [code0, code1, code2];
    numOfCodes = codeSnippets.length;
    let numOfSpacing = [8, 5, 4];

    random = Math.floor(Math.random() * numOfCodes);

    let i = 0;
    let j = 0;

    arrayLen = codeSnippets[random].length;
    testLen = codeSnippets[random].length - numOfSpacing[random];

    let wordElements = [];
    let tab;

    while ( i < arrayLen ){
    
        /*random = Math.floor(Math.random() * code1.length)
        if (random != 8){
            promptText += ' ';
        }*/
        if (codeSnippets[random][i] == 'br'){
            currentLine++;
        } else if (codeSnippets[random][i] == 'tab'){
            tab = document.createElement('td');
            tab.innerHTML = '&nbsp'//'<pre class="tab">  </pre>';
            document.getElementById("textArea"+currentLine).appendChild(tab);
        }else{
            promptText += (codeSnippets[random][i]);
            textOrder[i] = codeSnippets[random][i];

            wordElements[i] = document.createElement('td');
            wordElements[i].id = 'word'+j;
            wordElements[i].innerHTML = codeSnippets[random][i];
            document.getElementById("textArea"+currentLine).appendChild(wordElements[i]);
            j++;
        }
        i = i + 1;


    }
    
    wordElements[testLen] = document.createElement('td');
    wordElements[testLen].id = 'word'+testLen;
    wordElements[testLen].innerHTML = '';
    document.getElementById("textArea"+currentLine).appendChild(wordElements[testLen]);

}

function startTime(){
    if (isTiming == false){
        interval = setInterval(function(){ timer += 0.1 }, 100);
        isTiming = true;
    }
    
}

function stopTime(){
    clearInterval(interval);
    document.getElementById("timer").innerText = ''+timer.toFixed(2);
}
    

function getKeyPressed(event) {
    startTime();
    var char = event.which || event.keyCode;
    keyPressed = String.fromCharCode(char)
    
    if (keyPressed == ' ' || char == 13){
        checkWord();
        document.getElementById("inputField").value = null;
    }

    /*if (keyPressed == promptText.charAt(numPressed+1)){
        document.getElementById("correct").innerHTML = "Correct, numPressed: " + numPressed;
    } else{
        document.getElementById("correct").innerHTML = "Incorrect, the correct key is: " + promptText.charAt(numPressed);
    }*/
    
    numPressed++;
}

function restart() {
    location.reload();
}

function checkWord() {

        document.getElementById("word"+currentWord).style.backgroundColor = '#d4d4d4';
        if (currentWord == testLen){
            stopTime();
            accuracy = ((wordsCorrect/(testLen-1))*100).toFixed(2);
            document.getElementById("accuracy").innerText = accuracy+'';
            wpm = ((60/timer)*wordsCorrect).toFixed(2);
            document.getElementById("wpm").innerText = wpm+'';
        }

        if (currentWord != 0){
            if (document.getElementById("inputField").value.trim() == document.getElementById("word"+(currentWord-1)).innerText){
                document.getElementById("word"+(currentWord-1)).style.backgroundColor = '#6bb84f';
                wordsCorrect++;
            } else{
                document.getElementById("word"+(currentWord-1)).style.backgroundColor = '#ff6970';
                wordsIncorrect++;
            }
            
        }
        currentWord++;
}

//document.getElementById("mainTable").style.display = "inline-block";
generatePrompt();
document.getElementById("word0").style.backgroundColor = '#d4d4d4';
document.getElementById("inputField").focus();
document.getElementById("inputField").select();