// JavaScript source code
//<reference path="jquery.d.ts" />

var tournamentID = "8688088";
var extensionType = "json";
var APIKey = "1v7AQ1b5yf1gQpUZ1e64lBrMWcsnRJwlYV1m1jz5";
var mainTable = document.getElementById("mainTable");
//var inputTable = document.getElementById("inputTable");
var nameSubmit = document.getElementById("nameForm");
var nameInput = document.getElementById("name");

function refreshPage() {
    $.getJSON("https://api.challonge.com/v1/tournaments/" + tournamentID + "." + extensionType + "/?api_key=" + APIKey + "&include_participants=1",
        function showUserData(data) {
            var i = 0;
            var participants = data.tournament.participants;
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

window.onload = refreshPage();
nameSubmit.onsubmit = function addUser() {
    console.log(nameInput.value);
    name = nameInput.value;
    $.post("https://api.challonge.com/v1/tournaments/" + tournamentID + "/participants/bulk_add." + extensionType + "/?api_key=" + APIKey + "&participants[][name]=" + name);
    //document.getElementById("client").reset();
    refreshPage();
}
