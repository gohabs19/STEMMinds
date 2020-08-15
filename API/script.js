// JavaScript source code
//<reference path="jquery.d.ts" />

//res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

var tournamentIndex = 0;
var tournamentID/* = "8688088"*/;
var extensionType = "json";
var APIKey = "1v7AQ1b5yf1gQpUZ1e64lBrMWcsnRJwlYV1m1jz5";
var mainTable = document.getElementById("mainTable");
/*var addNameSubmit = document.getElementById("addNameForm");
var addNameInput = document.getElementById("addName");
//var deleteNameSubmit = document.getElementById("deleteNameForm");
var deleteNameInput = document.getElementById("deleteName");
var startTournamentSubmit = document.getElementById("startTournamentForm");
var resetTournamentSubmit = document.getElementById("resetTournamentForm");
//var deleteNameSubmit = document.getElementById("deleteNameForm");
//var deleteNameInput = document.getElementById("deleteName");
//var updateButton = document.getElementById("update");*/

window.onload = newPage();//Open page with refreshed content when loaded

function newPage() {
    getTournaments();
    pageSetup();
    sendResults();
}

function getTournaments() {
    $.getJSON("https://api.challonge.com/v1/tournaments." + extensionType + "/?api_key=" + APIKey,
        function showTournaments(data) {
            console.log(data);
            //tournamentID = data.tournament[tournamentIndex].id;
            tournamentID = data[tournamentIndex].tournament.id;
            console.log(tournamentID);
        }
    );
}

function pageSetup() {
    $.getJSON("https://api.challonge.com/v1/tournaments/" + tournamentID + "." + extensionType + "/?api_key=" + APIKey + "&include_participants=1",
        function showUserData(data) {
            //console.log(data);
            var participants = data.tournament.participants;
            var i = 0;
            var usernames = [];
            var userRankings = [];
            var mainTable = document.getElementById("mainTable");

            for (i = 0; i < participants.length; i++) {
                usernames[i] = participants[i].participant.display_name;
                userRankings[i] = participants[i].participant.seed;
                var newRow = mainTable.insertRow(-1);
                var newNameCell = newRow.insertCell(0);
                var newRankCell = newRow.insertCell(1);
                newNameCell.innerHTML = usernames[i];
                newRankCell.innerHTML = userRankings[i];
            }
        }
    );
}

function sendResults() {
    $.getJSON("https://api.challonge.com/v1/tournaments/" + tournamentID + "." + extensionType + "/?api_key=" + APIKey + "&include_participants=1",
        function collectNameAndRank(data) {
            var participants = data.tournament.participants;
            var data = [];
            var i = 0;
            for (i = 0; i < participants.length; i++) {
                data.push([participants[i].participant.final_rank, participants[i].participant.display_name]);
            }
            //console.log(data);
        }
    );
}



/*addNameSubmit.onsubmit = function addUser() {//Add name
    var name = addNameInput.value;
    //$.post("https://api.challonge.com/v1/tournaments/" + tournamentID + "/participants/bulk_add." + extensionType + "/?api_key=" + APIKey + "&participants[][name]=" + name);
    var settings = {
        "url": "https://api.challonge.com/v1/tournaments/" + tournamentID + "/participants/bulk_add." + extensionType + "/?api_key=" + APIKey + "&participants[][name]=" + name,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Cookie": "SPSI=8a3e59b60bedbe0273c9f37bb58bc998; SPSE=zXZCg5F2fi+8hHWPSQERRgUTCro6Mp4kI735K9Q8rPfMzZWtPEMxBXfXNK4/Jt4G013TFIBR+QqMTk+70s0gDA=="
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    refreshPage();
}
deleteNameInput.onclick = function deleteTournament() {
    var settings = {
        "url": "https://api.challonge.com/v1/tournaments/8688088/participants/127193991.json?api_key=1v7AQ1b5yf1gQpUZ1e64lBrMWcsnRJwlYV1m1jz5",
        "method": "DELETE",
        "timeout": 0,
        "headers": {
            "Cookie": "SPSI=8a3e59b60bedbe0273c9f37bb58bc998; SPSE=zXZCg5F2fi+8hHWPSQERRgUTCro6Mp4kI735K9Q8rPfMzZWtPEMxBXfXNK4/Jt4G013TFIBR+QqMTk+70s0gDA=="
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    refreshPage();
}
startTournamentSubmit.onsubmit = function startTournament() {
    var settings = {
        "url": "https://api.challonge.com/v1/tournaments/" + tournamentID + "/start." + extensionType + "/?api_key=" + APIKey,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Cookie": "SPSI=8a3e59b60bedbe0273c9f37bb58bc998; SPSE=zXZCg5F2fi+8hHWPSQERRgUTCro6Mp4kI735K9Q8rPfMzZWtPEMxBXfXNK4/Jt4G013TFIBR+QqMTk+70s0gDA=="
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    refreshPage();
    //window.location.reload(true);
    //Location.reload();
}
resetTournamentSubmit.onsubmit = function resetTournament() {
    var settings = {
        "url": "https://api.challonge.com/v1/tournaments/" + tournamentID + "/reset." + extensionType + "/?api_key=" + APIKey,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Cookie": "SPSI=8a3e59b60bedbe0273c9f37bb58bc998; SPSE=zXZCg5F2fi+8hHWPSQERRgUTCro6Mp4kI735K9Q8rPfMzZWtPEMxBXfXNK4/Jt4G013TFIBR+QqMTk+70s0gDA=="
        },
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    refreshPage();
    //window.location.reload(true);
    //Location.reload();
}*/
