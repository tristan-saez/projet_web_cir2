/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
* @Created Date: 16-Jun-2022
* @Last Modified: 16-Jun-2022
*/

'use strict';

//------------------------------------------------------------------------------
//--- redirectAfterConnection --------------------------------------------------
//------------------------------------------------------------------------------
// redirect after the connection
function redirectAfterCreation(result) {
    if(result == "good") {
        console.log("creation complete !");
        window.location.replace("index.html");
        alert("creation complete !");
    }
}

let sport = document.getElementById('sportselection');
let eventname = document.getElementById('eventname');
let eventdate = document.getElementById('eventdate');
let eventduration = document.getElementById('eventduration');
let price = document.getElementById('price');
let playernumber = document.getElementById('playernumber');
let eventplace = document.getElementById('eventplace');
let eventaddress = document.getElementById("eventadress");

let matching_passwords = false;

$('#event_form').submit((event) => {
    event.preventDefault();
    ajaxRequest('POST', 'php/inscription.php/create-match', redirectAfterCreation, "sport="+sport.value+"&eventname="+eventname.value+"&eventdate="+eventdate.value+"&eventduration="+eventduration.value+"&price="+price.value+"&playernumber="+playernumber.value+"&eventplace="+eventplace.value+"&eventaddress="+eventaddress.value);
});
