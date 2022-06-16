/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
* @Created Date: 16-Jun-2022
* @Last Modified: 16-Jun-2022
*/

'use strict';

//------------------------------------------------------------------------------
//--- accountConnection -----------------------------------------------------------
//------------------------------------------------------------------------------
// connect to an account with datas
function accountConnection(username, password) {
    ajaxRequest('POST', 'php/connection.php/account-connect');
}

function redirectAfterConnection(result) {
    if(result == "success") {
        window.location.replace("index.html");
    } else if(result == "username") {
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