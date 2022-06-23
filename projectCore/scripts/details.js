/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
* @Created Date: 16-Jun-2022
* @Last Modified: 16-Jun-2022
*/

'use strict';

function joinMatchPlease() {
    ajaxRequest('POST', 'php/details.php/join-match', joinMatchCallback,"match="+window.location.href.split("=")[1]);
}
function joinMatchCallback(result) {
    if(result == "good") {
        alert("Votre inscription a bien été enregistrée !");
    } else if(result == "is_in") {
        alert("Vous avez déjà envoyé une demande d'inscription");
    } else if(result == "limit") {
        alert("le match est déjà complet");
    } else if(result == "date") {
        alert("le match est déjà passé ou est en cours"); 
    }
}

function setDetails() {
    ajaxRequest('POST', 'php/details.php/set-details', displayDetails,"match="+window.location.href.split("=")[1]);
}

function acceptPlayer(player) {
    ajaxRequest('POST', 'php/details.php/accept-player', setDetails,"player="+player+"&match="+window.location.href.split("=")[1]);
}
function refusePlayer(player) {
    ajaxRequest('POST', 'php/details.php/refuse-player', setDetails,"player="+player+"&match="+window.location.href.split("=")[1]);
}

function displayDetails(result) {
    $('#detailsinformations').text("");
    document.getElementById("sporticon").src = result[0][11];
    $('#sportname').text(result[0][10]);
    $('#event_title').text(result[0][3]);
    $('#eventplace').text(result[0][4]+" - "+result[0][9])
    $('#eventdate').text(result[0][0]+" | "+result[0][1])
    $('#nbplayer').text(result[0][5]);
    $('#organiser_name').text(result[0][12]+" "+result[0][13]);
    $('#price').text(result[0][6]+" €");
    $('#duration').text(result[0][7]);
    (!result[0][8])?$('#score').text("\/ - \/"):$('#score').text(result[0][8]);

    let profile = ``;
    let nb_current_player = 0;
    if(result['is_organiser']) {
        for(var element in result['currentplayers']) {
            let profile_picture = (result['currentplayers'][element][2])?result['currentplayers'][element][2]:"/assets/images/defaultimage.png";
            let starOfTheMatch = (result['currentplayers'][element][3] == 1)?"starofthematch":"";

            if(result['currentplayers'][element][4] == "0") {
                profile= ` <div class="borderselection detailsprofil istobeaccepted ${starOfTheMatch}">
                            <div class="detailprofil">
                                    <div><img onclick="acceptPlayer('${result['currentplayers'][element][5]}')" class="cursor" id="accept" style="width: 20px;" src="/assets/icons/accept.png"><img class="detailsimg" src="${profile_picture}"><img onclick="refusePlayer('${result['currentplayers'][element][5]}')" class="cursor" id="refuse" style="width: 20px;" src="/assets/icons/refuse.png"></div>
                                    <div>
                                    <span>${result['currentplayers'][element][0]} ${result['currentplayers'][element][1]}</span>
                                </div>
                            </div>
                        </div>`;
                console.log(profile);
                $('#detailsinformations').append(profile);
                nb_current_player++;
            } else {
                profile= ` <div class="borderselection detailsprofil isaccepted ${starOfTheMatch}">
                        <div class="detailprofil">
                                <div><img class="detailsimg" src="${profile_picture}"></div>
                                <div>
                                <span>${result['currentplayers'][element][0]} ${result['currentplayers'][element][1]}</span>
                            </div>
                        </div>
                    </div>`;
                console.log(profile);
                $('#detailsinformations').append(profile);
                nb_current_player++;
            }
        }
    }  else {
        for(var element in result['currentplayers']) {
            if(result['currentplayers'][element][4] == "1") {
                let profile_picture = (result['currentplayers'][element][2])?result['currentplayers'][element][2]:"/assets/images/defaultimage.png";
                let starOfTheMatch = (result['currentplayers'][element][3] == 1)?"starofthematch":"";
                profile= ` <div class="borderselection detailsprofil ${starOfTheMatch}">
                        <div class="detailprofil">
                                <div><img class="detailsimg" src="${profile_picture}"></div>
                                <div>
                                <span>${result['currentplayers'][element][0]} ${result['currentplayers'][element][1]}</span>
                            </div>
                        </div>
                    </div>`;
                console.log(profile);
                $('#detailsinformations').append(profile);
                nb_current_player++;
            } else {
                profile = "";
            }
        }
    
    }
    $('#nbjoueur').text(nb_current_player);
}

setDetails();
