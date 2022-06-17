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
function redirectAfterInscription(result) {
    if(result == "good") {
        console.log("inscription complete !");
        window.location.replace("connection.html");
        alert("inscription complete !");
    }
}

let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let mail = document.getElementById('mail');
let birthdate = document.getElementById('birthdate');
let city = document.getElementById('city');
let password = document.getElementById('password');
let password_confirmation = document.getElementById('password_confirmation');
let picture =  $("#picture")[0].files[0];

let matching_passwords = false;

$('#password_confirmation').keyup(() => {
    if(password.value == password_confirmation.value) {
        password_confirmation.style = "border: solid 1px green;";
        matching_passwords = true;
    } else {
        password_confirmation.style = "border: solid 1px red;";
        matching_passwords = false;
    }
});

$('#inscription_form').submit((event) => {
    event.preventDefault();
    if(matching_passwords) {
        console.log(firstname.value,"/",lastname.value,"/",mail.value,"/",birthdate.value,"/",city.value,"/",password.value,"/",picture);
        ajaxRequest('POST', 'php/inscription.php/account-create', redirectAfterInscription, "firstname="+firstname.value+"&lastname="+lastname.value+"&mail="+mail.value+"&birthdate="+birthdate.value+"&city="+city.value+"&password="+password.value+"&picture="+null);
    } else {
        alert("Les mot de passe sont différents")
    }
    
});
