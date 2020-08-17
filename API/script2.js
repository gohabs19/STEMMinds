// JavaScript source code
//<reference path="jquery.d.ts" />

//res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

var tournamentIndex = 0;
var tournamentID/* = "8688088"*/;
var extensionType = "json";
var APIKey = "1v7AQ1b5yf1gQpUZ1e64lBrMWcsnRJwlYV1m1jz5";
var mainTable = document.getElementById("mainTable");


let playerScores = []/*[35, 40, 55, 2000]*/;
let playerNames = []/*['andrew', 'ben', 'john', 'anu']*/;
let sortedScores = [];
let sortedNames = [];
let leaderboard;
let dataLength;

var listOfParticipants = [];

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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function newPage() {
    getTournaments();
    //sleep(10000);
    pageSetup();
    sendResults();

    //calcSingleTournament([[1, 2, 3, 4], ['ben', 'billiam', 'brad', 'stephanie']]);
    //calcSingleTournament([[5, 2, 3, 3, 4, 1], ['stephanie', 'andrew', 'bill', 'greg', 'mac', 'anu']]);

    sortRanks();
    populate(playerNames.length);

    //sleep(1000);
    tournamentData();
}

function tournamentData() {
    console.log("Data length: " + dataLength);
    for (i = 0; i < dataLength; i++) {
        console.log("Data for tournament " + i + ": " + data[i].tournament.id + " List of participants: " + listOfParticipants);
    }
}

function getTournaments() {
    $.getJSON("https://api.challonge.com/v1/tournaments." + extensionType + "/?api_key=" + APIKey + "&include_participants=1",
        function showTournaments(data) {
            console.log(data);
            console.log("Number of tournaments: " + data.length);
            dataLength = data.length;
            //tournamentID = data.tournament[tournamentIndex].id;
            tournamentID = data[tournamentIndex].tournament.id;
            tournamentURL = data[tournamentIndex].tournament.url;
            //console.log(tournamentID);
            //console.log(tournamentURL);

            //Show data for all tournaments
            for (i = 0; i < dataLength; i++) {
                singleTournamentID = data[i].tournament.id;
                //console.log("Tournament: "+singleTournamentID)
                //var listOfParticipants=[];
                $.getJSON("https://api.challonge.com/v1/tournaments/" + singleTournamentID + "." + extensionType + "/?api_key=" + APIKey + "&include_participants=1",
                    function getParticipantList(singleTournamentData) {
                        //Tournament Participants List
                        var singleTournamentRankings = [];
                        var singleTournamentNames = [];
                        for (j = 0; j < singleTournamentData.tournament.participants.length; j++) {
                            /*
                                ****HERE IS WHERE I PULL THE INDIVIDUAL RANKINGS
                            */
                            if (singleTournamentData.tournament.participants[j].participant.final_rank != null) {
                                singleTournamentRankings.push(singleTournamentData.tournament.participants[j].participant.final_rank);
                                singleTournamentNames.push(singleTournamentData.tournament.participants[j].participant.name);
                            }
                            else { break;}
                            /*console.log("Name: " + singleTournamentData.tournament.participants[j].participant.name + " Rank: " + singleTournamentData.tournament.participants[j].participant.final_rank);
                            listOfParticipants.push(singleTournamentData.tournament.participants[j].participant.final_rank);*/
                        }
                        if (singleTournamentData.tournament.participants[0].participant.final_rank != null) {
                            console.log("Tournament: " + singleTournamentID + " " + singleTournamentRankings + " " + singleTournamentNames);
                            calcSingleTournament(singleTournamentRankings, singleTournamentNames);
                        }
                    }
                );
                //console.log("Data for tournament "+i+": "+data[i].tournament.id+" List of participants: "+listOfParticipants);
            }
        }
    );
    //document.getElementById('tournamentName').innerHTML = ("Tournament Name: "+ tournamentURL);
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

function populate(numOfPlayers) {
    let i = 0;
    let players = [];
    let rank = [];
    let name = [];
    let score = [];

    division = document.createElement('div');
    document.getElementById('myList').appendChild(division)

    leaderboard = document.createElement('table');
    division.appendChild(leaderboard);

    header = document.createElement('tr');
    header.id = 'header';
    leaderboard.appendChild(header);

    rankTag = document.createElement('th');
    rankTag.innerHTML = 'Rank';
    header.appendChild(rankTag);

    nameTag = document.createElement('th');
    nameTag.innerHTML = 'Username';
    header.appendChild(nameTag);

    scoreTag = document.createElement('th');
    scoreTag.innerHTML = 'Points';
    header.appendChild(scoreTag);

    while (i < numOfPlayers) {

        players[i] = document.createElement('tr');
        players[i].id = 'player' + i;
        leaderboard.appendChild(players[i]);

        rank[i] = document.createElement('td');
        if (i == 0) {
            rank[i].innerHTML = "<b>" + (i + 1) + "</b>";
        } else {
            rank[i].innerHTML = (i + 1);
        }
        players[i].appendChild(rank[i]);

        name[i] = document.createElement('td');
        if (i == 0) {
            name[i].innerHTML = "<b>" + playerNames[i] + "</b>";
        } else {
            name[i].innerHTML = playerNames[i];
        }
        name[i].id = 'player' + i;
        players[i].appendChild(name[i]);

        score[i] = document.createElement('td');
        if (i == 0) {
            score[i].innerHTML = "<b>" + Math.round(playerScores[i]) + "</b>";
        } else {
            score[i].innerHTML = Math.round(playerScores[i]);
        }
        score[i].id = 'player' + i;
        players[i].appendChild(score[i]);

        i++;
    }

}

function calcSingleTournament(tournamentResults) {
    // format of tournamentResults: [rank][name]
    //alert(tournamentResults[1].length);

    let i = 0;
    while (i < tournamentResults[1].length) {

        let nameIndex = playerNames.indexOf(tournamentResults[1][i]);

        if (nameIndex == -1) {
            playerNames.push(tournamentResults[1][i]);
            playerScores.push((5 * tournamentResults[0].length) / (tournamentResults[0][i]));
        } else {
            playerScores[nameIndex] += (5 * tournamentResults[0].length) / (tournamentResults[0][i]);
        }

        i++;
    }
}

function sortRanks() {
    let i = 0;
    let j = 0;
    let greatest;
    let greatestIndex;

    while (i < playerNames.length) {

        greatest = 0;
        greatestIndex = 0;
        j = 0;

        while (j < playerNames.length) {

            if (playerScores[j] > greatest) {
                greatest = playerScores[j];
                greatestIndex = j;
            }

            j++;
        }


        sortedScores.push(playerScores[greatestIndex]);
        sortedNames.push(playerNames[greatestIndex]);


        playerScores[greatestIndex] = 0;

        i++;
    }

    playerScores = sortedScores;
    playerNames = sortedNames;
}

function previousTournament() {
    $.getJSON("https://api.challonge.com/v1/tournaments." + extensionType + "/?api_key=" + APIKey,
        function showTournaments(data) {
            //console.log(data);
            //console.log("Number of tournaments: " + data.length);
            //tournamentID = data.tournament[tournamentIndex].id;
            tournamentID = data[tournamentIndex].tournament.id;
            tournamentURL = data[tournamentIndex].tournament.url;
            //console.log(tournamentID);
            //console.log(tournamentURL);
        }
    );

    if (tournamentIndex >= 0) {
        tournamentIndex--;
        document.getElementById('frame').src = "https://challonge.com/" + tournamentURL + "/module";
        document.getElementById('tournamentName').innerHTML = ("Tournament Name: " + tournamentID);
    } else {
        alert("There are no older tournaments");
    }


}

function nextTournament() {



    $.getJSON("https://api.challonge.com/v1/tournaments." + extensionType + "/?api_key=" + APIKey,
        function showTournaments(data) {

            console.log(data);
            console.log("Number of tournaments: " + data.length);
            //tournamentID = data.tournament[tournamentIndex].id;\
            tournamentID = data[tournamentIndex].tournament.id;
            tournamentURL = data[tournamentIndex].tournament.url;
            //console.log(tournamentID);
            //console.log(tournamentURL);

        }
    );


    if (tournamentIndex < dataLength) {
        tournamentIndex++;
        document.getElementById('frame').src = "https://challonge.com/" + tournamentURL + "/module";
        document.getElementById('tournamentName').innerHTML = ("Tournament Name: " + tournamentURL);

    } else {
        alert("This is the most recent tournament, number: " + tournamentIndex + '/' + dataLength);
    }


}


function calcLeaderboard() {
    $.getJSON("https://api.challonge.com/v1/tournaments." + extensionType + "/?api_key=" + APIKey,
        function showTournaments(data) {

            console.log(data);
            console.log("Number of tournaments: " + data.length);
            //tournamentID = data.tournament[tournamentIndex].id;\
            tournamentID = data[tournamentIndex].tournament.id;
            tournamentURL = data[tournamentIndex].tournament.url;
            //console.log(tournamentID);
            //console.log(tournamentURL);

        }
    );


}



function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = leaderboard;
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
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
