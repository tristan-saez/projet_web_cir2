/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
* @Created Date: 16-Jun-2022
* @Last Modified: 16-Jun-2022
*/

'use strict';

//------------------------------------------------------------------------------
//--- showAutocomplete ---------------------------------------------------------
//------------------------------------------------------------------------------
// show results from automplete on the screen
function showAutocomplete(result) {
    $('#autocomplete').remove();
    let autocomplete = `<ul id="autocomplete">`;
    for(let element in result) {
        autocomplete += `<li class="city_auto" onclick="selectItem('${result[element]['name']}')">${result[element]['name']}<\li>`;
    }

    autocomplete += `</ul>`;
    $('.need_autocomplete').append(autocomplete);
}

//--- removeAutocomplete ---------------------------------------------------------
// remove the list autocomplete from client screen
function removeAutocomplete() {
    $('#autocomplete').remove();
}

//--- removeAutocomplete ---------------------------------------------------------
// remove the list autocomplete from client screen
function getResults(city) {
    ajaxRequest('GET', 'php/autocomplete.php/', showAutocomplete, "city="+city);
}

//--- selectItem ---------------------------------------------------------
// put value of autocomplete in input field
function selectItem(city) {
    let field = $('.need_autocomplete :input');
    field[0].value = city;
}

// when client is typing if 3 or more characters is in the input, get autocompletion
$('.need_autocomplete').keyup(() => {
    let field = $('.need_autocomplete :input');
    
    if(field[0].value.length >= 3) getResults(field[0].value);
    if(field[0].value.length < 3) removeAutocomplete();
});

// when client is click on a field from the autocomplete, change it
$('.need_autocomplete').click(() => {
    let field = $('.need_autocomplete :input');
    field.trigger('change');
    removeAutocomplete();
})