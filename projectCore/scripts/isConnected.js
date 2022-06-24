/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
*/

'use strict';

//------------------------------------------------------------------------------
//--- CheckConnection ----------------------------------------------------------
//------------------------------------------------------------------------------
// Check if a user is connected or not

function CheckConnection() {
    ajaxRequest('GET', 'php/connection.php/check-connection/', redirectToConnect);
}

//--- redirectToConnect -------------------------------------------------------
// redirect if user is not connected
function redirectToConnect(isconnected) {
    if(!isconnected) {
        console.log("not connected : redirecting...");
        window.location.replace("connection.html");
    }
}

CheckConnection();