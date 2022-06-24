/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
*/

'use strict';

//--- setDetails -------------------------------------------------------
// AJAX request to change/add stats
function setDetails() {
    ajaxRequest('POST', 'php/stats.php/display-details', displayDetails,"match="+window.location.href.split("=")[1]);
}

//--- displayDetails ---------------------------------------------------
// display details on user screen
function displayDetails(result) {
    document.getElementById("sportimage").src = result[0]['picture'];
    $('#sportname').text(result[0][5]);
    $('#event_title').text(result[0][1]);
    $('#city').text(result[0][4])
    $('#date').text(result[0]['date'])
    $('#place').text(result[0]['address']);

    
    if(result[0]['score']) {
        console.log(result[0]['score'].split(" "));
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

//--- changeProfilePicture -------------------------------------------------------
// get displayed user's profile picture
function changeProfilePicture() {
    let profile_picture = $('#bestplayerselection').val();
    ajaxRequest('POST', 'php/stats.php/get-profile-picture', displayProfilePicture,"profile-picture="+profile_picture);
}

//--- displayProfilePicture -------------------------------------------------------
// show displayed user's profile picture on user's screen
function displayProfilePicture(result) {
    document.getElementById('profile_picture').src = (result)?result:"/assets/images/defaultimage.png";
}

// update stats on form submit with an AJAX request
$('#stat_form').submit((event)=> {
    event.preventDefault();

    let score1 = ($('#score1').val())?$('#score1').val():"null";
    let score2 = ($('#score2').val())?$('#score2').val():"null";
    let star = $('#bestplayerselection').val();

    console.log(score1);
    ajaxRequest('POST', 'php/stats.php/set-stats', setDetails,"match="+window.location.href.split("=")[1]+"&star="+star+"&score1="+score1+"&score2="+score2);
    alert('Stats enregistrées !');
});


setDetails();
