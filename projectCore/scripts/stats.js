/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
* @Created Date: 16-Jun-2022
* @Last Modified: 16-Jun-2022
*/

'use strict';

function setDetails() {
    ajaxRequest('POST', 'php/stats.php/display-details', displayDetails,"match="+window.location.href.split("=")[1]);
}

function displayDetails(result) {
    document.getElementById("sportimage").src = result[0]['picture'];
    $('#sportname').text(result[0][5]);
    $('#event_title').text(result[0][1]);
    $('#city').text(result[0][4])
    $('#date').text(result[0]['date'])
    $('#place').text(result[0]['address']);

    console.log(result[0]['score'].split(" "));
    if(result[0]['score']) {
        let final_result = result[0]['score'].split(" ");
        $('#score1').val(final_result[0]);
        $('#score2').val(final_result[2]); 
    }

    let best_player_selection = ``;
    for(var element in result['currentplayers']) {
        if(result['currentplayers'][element][5] == "1") {
            let starOfTheMatch = (result['currentplayers'][element]['is_best_player'] == 1)?"selected":"";
            best_player_selection = `<option value="${result['currentplayers'][element]['mail']}" ${starOfTheMatch}>${result['currentplayers'][element]['first_name']+" "+result['currentplayers'][element]['last_name']}</option>`;
            $('#bestplayerselection').append(best_player_selection);
        } else {
            best_player_selection = "";
        }
    }
    changeProfilePicture();
}

function changeProfilePicture() {
    let profile_picture = $('#bestplayerselection').val();
    ajaxRequest('POST', 'php/stats.php/get-profile-picture', displayProfilePicture,"profile-picture="+profile_picture);
}
function displayProfilePicture(result) {
    document.getElementById('profile_picture').src = (result)?result:"/assets/images/defaultimage.png";
}
function putStats() {

}

setDetails();
