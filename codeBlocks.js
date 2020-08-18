
var playerPiece;
let numOfMoves = 0;
let codeText;
let codeElements = [];
let z = 0;

function startGame() {
    playerPiece = new component(30, 30, "rgb(0, 191, 255)", 30, 120);
    winGamePiece = new component(30, 30, 'yellow', 420, 120);
    wall1 = new component(240, 30, '#ff5050', 0, 240);
    wall2 = new component(150, 30, '#ff5050', 30, 180);
    wall3 = new component(150, 30, '#ff5050', 30, 90);
    wall4 = new component(30, 180, '#ff5050', 210, 60);
    wall5 = new component(30, 180, '#ff5050', 270, 60);
    wall6 = new component(150, 30, '#ff5050', 270, 180);
    wall7 = new component(30, 150, '#ff5050', 330, 0);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.speedX = 0;
        this.y += this.speedY;
        this.speedY = 0;
    }    
}

function updateGameArea() {
    myGameArea.clear();
    playerPiece.newPos();    
    playerPiece.update();
    winGamePiece.update();
    wall1.update();
    wall2.update();
    wall3.update();
    wall4.update();
    wall5.update();
    wall6.update();
    wall7.update();

    if (playerPiece.x == winGamePiece.x && playerPiece.y == winGamePiece.y){

    }
    if (playerPiece.y == wall1.y || playerPiece.y == wall2.y){
        console.log('lose');
    }
}

function empty(){
    document.getElementById('codeStage').textContent = '';
}


function moveup() {
    document.getElementById('codeStage').textContent += ('Up ');
    
}

function movedown() {
    //let moveDown = document.createElement('h3');
    //moveDown.id = 'down';
    //moveDown.innerHTML = '<br>Down ';
    document.getElementById('codeStage').textContent += ('Down ');
}

function moveleft() {
    document.getElementById('codeStage').textContent += ('Left ');
    
}

function moveright() {
    document.getElementById('codeStage').textContent += ('Right ');
    
}

function loop(){
    let x = document.getElementById('loopNum').value;
    document.getElementById('codeStage').textContent += ('Loop '+x+' ');
}

function endLoop(){
    document.getElementById('codeStage').textContent += ('EndLoop ');
}

function run(){
    let fullCode = document.getElementById('codeStage').innerText;
    let code = fullCode.split(" ");

    //alert(fullCode);

    let i = 0;
    while (i < code.length){

        if (code[i] == 'Up'){
            playerPiece.speedY -= 30; 
            numOfMoves++;
        } else if (code[i] == 'Down'){
            playerPiece.speedY += 30; 
            numOfMoves++;
        } else if (code[i] == 'Left'){
            playerPiece.speedX -= 30; 
            numOfMoves++;
        } else if (code[i] == 'Right'){
            playerPiece.speedX += 30; 
            numOfMoves++;
        } else if (code[i] == 'Loop'){
            let k = 0;
            let numOfLoops = code[i+1];

            while (k < numOfLoops){
                let j = i+2;
                while (code[j] != 'EndLoop'){

                    if (code[j] == 'Up'){
                        playerPiece.speedY -= 30; 
                        numOfMoves++;
                    } else if (code[j] == 'Down'){
                        playerPiece.speedY += 30; 
                        numOfMoves++;
                    } else if (code[j] == 'Left'){
                        playerPiece.speedX -= 30; 
                        numOfMoves++;
                    } else if (code[j] == 'Right'){
                        playerPiece.speedX += 30; 
                        numOfMoves++;
                    }

                    j=j+1;
                }
                k=k+1;
            }
            i = j;
        }

        i++;
    }
}