/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
*/

'use strict';

//------------------------------------------------------------------------------
//--- redirectAfterCreation --------------------------------------------------
//------------------------------------------------------------------------------
// redirect after the match creation
function redirectAfterCreation(result) {
    if(result == "good") {
        console.log("creation complete !");
        window.location.replace("index.html");
        alert("creation complete !");
    }
}

//get all datas for match creation
let sport = document.getElementById('sportselection');
let eventname = document.getElementById('eventname');
let eventdate = document.getElementById('eventdate');
let eventduration = document.getElementById('eventduration');
let price = document.getElementById('price');
let playernumber = document.getElementById('playernumber');
let eventplace = document.getElementById('eventplace');
let eventaddress = document.getElementById('eventadress');
let starting_time = document.getElementById('startingtime');

//on form submit, submit datas to php file
$('#event_form').submit((event) => {
    event.preventDefault();
    ajaxRequest('POST', 'php/createMatch.php/create-match', redirectAfterCreation, "sport="+sport.value+"&eventname="+eventname.value+"&eventdate="+eventdate.value+"&eventduration="+eventduration.value+"&price="+price.value+"&playernumber="+playernumber.value+"&eventplace="+eventplace.value+"&eventaddress="+eventaddress.value+"&startingtime="+starting_time.value);
});
