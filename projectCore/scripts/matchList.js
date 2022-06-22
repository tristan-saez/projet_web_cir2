/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
* @Created Date: 16-Jun-2022
* @Last Modified: 16-Jun-2022
*/

'use strict';

function requestUpdate() {
    ajaxRequest('GET', 'php/updateDatas.php/match-list', displayMatches);
}

function showDetails(match) {
    window.location.replace("details.html?match="+match);
}

function displayMatches(result) {
    for(var element in result) {
        var match_template = `<div class="borderselection eventpageselection">
            <div class="sportype"><img  class="eventsporticon" src="${result[element]['picture']}">
                <div>${result[element][8]}</div>
            </div>
            <div class="eventeventitle">${result[element][4]}</div>
            <div class="eventnormaltext">${result[element]['address']} - ${result[element][7]}</div>
            <div class="eventnormaltext">${result[element]['date']}</div>
            <div class="eventnormaltext"><span class="nbjoueur">${result[element]['current_players']}</span>/<span class="nbplayer">${result[element]['nb_player']}</span></div>
            <div><img onclick="showDetails(${result[element][0]})" class="eventdetails cursor" src="/assets/icons/details.png"></div>
        </div>`;
        console.log(match_template);
        $('#matchstext').append(match_template);
    }
}

requestUpdate();