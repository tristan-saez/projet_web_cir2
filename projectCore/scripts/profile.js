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

function showProfile() {
    ajaxRequest('GET', 'php/profile.php/show-profile/', showInfos);
}
function updateProfile() {
    document.getElementById('lastnamefield').disabled=true;
    document.getElementById('firstnamefield').disabled=true;
    document.getElementById('password').disabled=true;
    document.getElementById('age').disabled=true;
    document.getElementById('age').type="text";
    document.getElementById('city').disabled=true;
    $('#password').val("");
    document.getElementById('maj_button').style.display="none";
    ShowProfile();
}

function showInfos(result) {
    console.log(result);
    $('.lastname').text(result['0']['last_name']);
    $('.firstname').text(result['0']['first_name']);
    $('#lastnamefield').val(result['0']['last_name']);
    $('#firstnamefield').val(result['0']['first_name']);
    $('#email').val(result['0']['mail']);
    $('#age').val(result['age']+" ans");
    $('#city').val(result['0']['name']);
    $('#gameplayed').text(result['0']['played_matches']);
    if(result['0']['picture']) document.getElementById("profilimage").src = result['0']['picture'];
    rating(parseInt(result['0']['app_note']));
    showShape(result['0']['physical_shape']);

    ajaxRequest('GET', 'php/profile.php/get-pictures-list/', showPictureList);
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
    var picture = document.getElementById("profile_picture").value;
    ajaxRequest('POST', 'php/profile.php/update-picture/', showProfile, "picture="+picture);
}
function showPictureList(pic_list) {
    $('#profile_picture').text("");
    var pic_choice =``;
    let current_pic = document.getElementById("profilimage").src;
    current_pic = current_pic.split("/")[5].split(".")[0];
    console.log(current_pic);

    for(let element in pic_list) {

        pic_choice =  `<option value="${pic_list[element]}" ${(pic_list[element] == current_pic)?"selected":""}>Photo de profil ${parseInt(element)+1}</option>`;
        $('#profile_picture').append(pic_choice);
    }
    
}


function redirectAfterDisconnection() {
    window.location.replace("connection.html");
}

$('#disconnect').click(()=> {
    ajaxRequest('POST', 'php/connection.php/account-disconnect', redirectAfterDisconnection);
});

$('#settings').click(()=> {
    document.getElementById('lastnamefield').disabled=false;
    document.getElementById('firstnamefield').disabled=false;
    document.getElementById('password').disabled=false;
    document.getElementById('age').disabled=false;
    document.getElementById('age').type="date";
    document.getElementById('city').disabled=false;
    document.getElementById('maj_button').style.display="block";
});

$('#profilinformations').submit((event)=> {
    event.preventDefault();

    let last_name = document.getElementById('lastnamefield').value;
    let first_name = document.getElementById('firstnamefield').value;
    let mail = document.getElementById('email').value;
    let city = document.getElementById('city').value;
    let password = document.getElementById('password').value;
    let birthdate = document.getElementById('age').value;
    ajaxRequest('POST', 'php/profile.php/update-infos', updateProfile,"lastname="+last_name+"&firstname="+first_name+"&mail="+mail+"&city="+city+"&password="+password+"&birthdate="+birthdate);
});

showProfile();