/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
* @Created Date: 16-Jun-2022
* @Last Modified: 16-Jun-2022
*/

'use strict';

//------------------------------------------------------------------------------
//--- CheckConnection ----------------------------------------------------------
//------------------------------------------------------------------------------
// Check if a user is connected or not

function CheckConnection() {
    ajaxRequest('GET', 'php/connection.php/check-connection', redirectToConnect);
}

function redirectToConnect() {
    window.location.replace("connection.html");
}

CheckConnection();