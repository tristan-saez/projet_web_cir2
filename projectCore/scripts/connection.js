/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
*/

'use strict';

//------------------------------------------------------------------------------
//--- redirectAfterConnection --------------------------------------------------
//------------------------------------------------------------------------------
// redirect after the connection
function redirectAfterConnection(result) {
    if(result == "success") {
        window.location.replace("index.html");
    } else if(result == "mail") {
        window.location.replace("connection.html");
        alert("Utilisateur inconnu");
    } else if(result == "password") {
        window.location.replace("connection.html");
        alert("Mot de passe incorrect");
    } else if(result == "other") {
        window.location.replace("connection.html");
        alert("Une erreur est survenue veuilez reéssayer");
    }
}

let mail = document.getElementById('mail');
let password = document.getElementById('password');

//on form submition send datas to php
$('#connection_form').submit((event) => {
    event.preventDefault();
    ajaxRequest('POST', 'php/connection.php/account-connect', redirectAfterConnection, "mail="+mail.value+"&password="+password.value);
});
