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

function ShowProfile() {
    ajaxRequest('GET', 'php/profile.php/show-profile/', showInfos);
}
function showInfos(result) {
    console.log(result);
    $('.lastname').text(" "+result['0']['last_name']);
    $('.firstname').text(" "+result['0']['first_name']);
    $('#email').text(" "+result['0']['mail']);
    $('#age').text(" "+result['age']+" ans");
    $('#city').text(" "+result['0']['name']);
    $('#gameplayed').text(" "+result['0']['played_matches']);
    if(result['0']['picture']) document.getElementById("profilimage").src = result['0']['picture'];
    rating(parseInt(result['0']['app_note']));
    showShape(result['0']['physical_shape']);
}

function updateRating(rating) {
    console.log("updating...");
    ajaxRequest('POST', 'php/profile.php/update-rating/', showRating, "rating="+rating);
}

function showRating(result) {
    rating(parseInt(result));
}

//functions for physical shape
function updateShape() {
    var shape = document.getElementById("physicalshape").value;
    ajaxRequest('POST', 'php/profile.php/update-shape/', showShape, "shape="+shape);
}
function showShape(shape) {
    console.log(shape);
    document.getElementById("physicalshape").value = shape;
}

//functions for pictures
function updatePicture() {
    var picture = document.getElementById("physicalshape").src;
    ajaxRequest('POST', 'php/profile.php/update-picture/', showShape, "shape="+shape);
}
function showPicture(shape) {
    console.log(shape);
    document.getElementById("physicalshape").value = shape;
}


function redirectAfterDisconnection() {
    window.location.replace("connection.html");
}

$('#disconnect').click(()=> {
    ajaxRequest('POST', 'php/connection.php/account-disconnect', redirectAfterDisconnection);
});

ShowProfile();