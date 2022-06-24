/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
*/

'use strict';

//--- requestUpdateComing -------------------------------------------------------
// ajax request to get user's joined matchs
function requestUpdateComing() {
    ajaxRequest('GET', 'php/updateDatas.php/match-coming-list', displayMatchesComing);
}

//--- showDetailsComing -------------------------------------------------------
// redirect to details page
function showDetailsComing(match) {
    window.location.replace("details.html?match="+match);
    console.log(match);
}

//--- displayMatchesComing -------------------------------------------------------
// display matches list on user screen
function displayMatchesComing(result) {
    var match_template = "";
    $('#matchstext').text("");
    
    for(var element in result) {
        match_template = `<div class="borderselection eventpageselection">
            <div class="sportype"><img  class="eventsporticon" src="${result[element]['picture']}">
                <div>${result[element][8]}</div>
            </div>
            <div class="eventeventitle">${result[element][4]}</div>
            <div class="eventnormaltext">${result[element]['address']} - ${result[element][7]}</div>
            <div class="eventnormaltext">${result[element]['date']}</div>
            <div class="eventnormaltext"><span class="nbjoueur">${result[element]['current_players']}</span>/<span class="nbplayer">${result[element]['nb_player']}</span></div>
            <div><img onclick="showDetailsComing(${result[element][0]})" class="eventdetails cursor" src="/assets/icons/details.png"></div>
        </div>`;
        if(result[element]['is_full']) $('#matchstext').append(match_template);
    }
}

// send datas to filter matches
$('#filter_form').change(()=> {

    let city = (document.getElementById('cityfiltration').value == '')?0:document.getElementById('cityfiltration').value;
    let date = document.getElementById('datefiltration').value;
    let sport = document.getElementById('sportfiltration').value;
    let is_full = document.getElementById('ismatchfull').value;

    ajaxRequest('GET', 'php/filtering.php/filter-match-coming-list', displayMatchesComing, "city="+city+"&date="+date+"&sport="+sport+"&is_full="+is_full);
});


requestUpdateComing();