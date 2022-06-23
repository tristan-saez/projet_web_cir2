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
function showAutocomplete(result) {
    $('#autocomplete').remove();
    let autocomplete = `<ul id="autocomplete">`;
    for(let element in result) {
        autocomplete += `<li class="city_auto" onclick="selectItem('${result[element]['name']}')">${result[element]['name']}<\li>`;
    }

    autocomplete += `</ul>`;
    $('.need_autocomplete').append(autocomplete);
}
function removeAutocomplete() {
    $('#autocomplete').remove();
}

function getResults(city) {
    ajaxRequest('GET', 'php/autocomplete.php/', showAutocomplete, "city="+city);
}
function selectItem(city) {
    let field = $('.need_autocomplete :input');
    field[0].value = city;
}

$('.need_autocomplete').keyup(() => {
    let field = $('.need_autocomplete :input');
    
    if(field[0].value.length >= 4) getResults(field[0].value);
    if(field[0].value.length < 4) removeAutocomplete();
});

$('.need_autocomplete').click(() => {
    let field = $('.need_autocomplete :input');
    field.trigger('change');
    removeAutocomplete();
})