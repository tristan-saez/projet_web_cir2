/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
*/

'use strict';

//------------------------------------------------------------------------------
//--- redirectAfterInscription -------------------------------------------------
//------------------------------------------------------------------------------
// redirect after the account creation
function redirectAfterInscription(result) {
    if(result == "good") {
        console.log("inscription complete !");
        window.location.replace("connection.html");
        alert("inscription complete !");
    }
}

// get form datas
let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let mail = document.getElementById('mail');
let birthdate = document.getElementById('birthdate');
let city = document.getElementById('city');
let password = document.getElementById('password');
let password_confirmation = document.getElementById('password_confirmation');
let picture = document.getElementById("picture");

let matching_passwords = false;

//just some css modifications to show if passwords matches
$('#password_confirmation').keyup(() => {
    if(password.value == password_confirmation.value) {
        password_confirmation.style = "border: solid 1px green;";
        matching_passwords = true;
    } else {
        password_confirmation.style = "border: solid 1px red;";
        matching_passwords = false;
    }
});

// send ajax request to create a user and check if passwords matches
$('#inscription_form').submit((event) => {
    event.preventDefault();


    if(matching_passwords) {

        console.log(firstname.value,"/",lastname.value,"/",mail.value,"/",birthdate.value,"/",city.value,"/",password.value,"/");
        ajaxRequest('POST', 'php/inscription.php/account-create', redirectAfterInscription, "firstname="+firstname.value+"&lastname="+lastname.value+"&mail="+mail.value+"&birthdate="+birthdate.value+"&city="+city.value+"&password="+password.value+"&picture="+null);
    } else {
        alert("Les mot de passe sont différents")
    }
    
});
