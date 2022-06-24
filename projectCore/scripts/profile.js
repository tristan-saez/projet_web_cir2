/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
*/

'use strict';

//------------------------------------------------------------------------------
//--- showProfile --------------------------------------------------------------
//------------------------------------------------------------------------------
// ajax request to get profile details

function showProfile() {
    ajaxRequest('GET', 'php/profile.php/show-profile/', showInfos);
}

//--- updateProfile -------------------------------------------------------
// lock profile fields after modification
function updateProfile() {
    document.getElementById('lastnamefield').disabled=true;
    document.getElementById('firstnamefield').disabled=true;
    document.getElementById('password').disabled=true;
    document.getElementById('age').disabled=true;
    document.getElementById('age').type="text";
    document.getElementById('city').disabled=true;
    $('#password').val("");
    document.getElementById('maj_button').style.display="none";
    showProfile();
}

//--- showInfos -------------------------------------------------------
// show profile infos in user screen
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

//--- updateRating -------------------------------------------------------
// update rating value
function updateRating(rating) {
    console.log("updating...");
    ajaxRequest('POST', 'php/profile.php/update-rating/', showRating, "rating="+rating);
}

//--- showRating -------------------------------------------------------
// show rating stars
function showRating(result) {
    rating(parseInt(result));
}

//--- updateShape -------------------------------------------------------
// update physical shape value
function updateShape() {
    var shape = document.getElementById("physicalshape").value;
    ajaxRequest('POST', 'php/profile.php/update-shape/', showShape, "shape="+shape);
}
//--- showShape -------------------------------------------------------
// show physical shape value
function showShape(shape) {
    console.log(shape);
    document.getElementById("physicalshape").value = shape;
}

//--- updatePicture -------------------------------------------------------
// update picture in the database for current user
function updatePicture() {
    var picture = document.getElementById("profile_picture").value;
    ajaxRequest('POST', 'php/profile.php/update-picture/', showProfile, "picture="+picture);
}
//--- showPictureList -------------------------------------------------------
// show picture list to user in a <select>
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

//--- redirectAfterDisconnection -------------------------------------------------------
// redirect user after its disconnection
function redirectAfterDisconnection() {
    window.location.replace("connection.html");
}

//If the user click on disconnect button, send an ajaxRequest to disconnect
$('#disconnect').click(()=> {
    ajaxRequest('POST', 'php/connection.php/account-disconnect', redirectAfterDisconnection);
});

// change page to let user edit its profile. pay attention to some field like birthdate & password that needs to be re-set
$('#settings').click(()=> {
    document.getElementById('lastnamefield').disabled=false;
    document.getElementById('firstnamefield').disabled=false;
    document.getElementById('password').disabled=false;
    document.getElementById('age').disabled=false;
    document.getElementById('age').type="date";
    document.getElementById('city').disabled=false;
    document.getElementById('maj_button').style.display="block";
});

// on modification form send get modified values and send an AJAX request to modify them
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