// JavaScript source code
var designer = 0;//This score increases when we see indications that a user is more creative and likes to come up with new ideas
var programmer = 0;//This score increases when we see indications that a user likes to methodically and sequetially do things
var engineer = 0;//This score increases when we see indications that a user has a programmer-like mindset, but seems to like things to be hands-on
var entrepreneur = 0;//This score increases when we see indications that a user has a business-oriented mindset
var scale = 3;

var storySagePrograms = ['Minecraft', '2D Design', 'FP', 'Animation', 'Music'];
var dauntlessDigitalDesignPrograms = ['App Design', '3D Design'];
var gamesGuruPrograms = ['Flowlab', 'Scratch', 'Unity'];
var codingConnoisseurPrograms = ['Python', 'Web Design', 'Processing'];
var hardwareHeroPrograms = ['Micro: Bit', 'Arduino'];
var robotRoyaltyPrograms = ['Lego', 'Sphero'];
var publicSpeakingPrograms = [];

function showResults() {
    var rankedScores = rankScores([designer, programmer, engineer, entrepreneur]);//Returns the scores in order
    //console.log(rankedScores);
    //Organization into programs
    if (rankedScores[0] == designer && rankedScores[0] - scale > rankedScores[1]) {//If the user is far designer-heavy (story sage)
        //console.log('Story Sage');
        document.getElementById('type').innerText += ' Story Sage';
        document.getElementById('programs').innerText += printArray(storySagePrograms);
    }
    else if (rankedScores[0] == designer) {
        document.getElementById('type').innerText += ' Dauntless Digital Design';
        document.getElementById('programs').innerText += printArray(dauntlessDigitalDesignPrograms);
    }
    else if (rankedScores[0] == programmer && rankedScores[0] - scale > rankedScores[1]) {
        document.getElementById('type').innerText += ' Coding Connoisseur';
        document.getElementById('programs').innerText += printArray(codingConnoisseurPrograms);
    }
    else if (rankedScores[0] == programmer) {
        document.getElementById('type').innerText += ' Games Guru';
        document.getElementById('programs').innerText += printArray(gamesGuruPrograms);
    }
    else if (rankedScores[0] == engineer && rankedScores[0] - scale > rankedScores[1]) {
        document.getElementById('type').innerText += ' Robot Royalty';
        document.getElementById('programs').innerText += printArray(robotRoyaltyPrograms);
    }
    else if (rankedScores[0] == engineer) {
        document.getElementById('type').innerText += ' Hardware Hero';
        document.getElementById('programs').innerText += printArray(hardwareHeroPrograms);
    }
    else if (rankedScores[0] == entrepreneur) {
        document.getElementById('type').innerText += 'Public Speaker';
        document.getElementById('programs').innerText += printArray(publicSpeakingPrograms);
    }
}

function printArray(arr) {
    var concatArray = '';
    for (i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            concatArray += arr[i];
        }
        else {
            concatArray += arr[i] + ', ';
        }
    }
    return concatArray;
}

function rankScores(arr) {//This function is used to rank the categories that apply to the user (designer, programmer, engineer, entrepreneur)
    var len = arr.length;
    for (var i = len - 1; i >= 0; i--) {
        for (var j = 1; j <= i; j++) {
            if (arr[j - 1] > arr[j]) {
                var temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    arr.reverse();
    return arr;
}
