/* 
function indexmouseenter(id){
    document.getElementById(id).style.opacity = 1;
}

function indexmouseleave(id){
    document.getElementById(id).style.opacity = 0.8;
}

function logomouseenter(id){
    document.getElementById(id).style.backgroundColor = 'rgba(7, 59, 76, 0.3)';
    document.getElementById(id).style.borderRadius = '10px';
}


function logomouseleave(id){
    document.getElementById(id).style.backgroundColor = 'rgba(7, 59, 76, 0)';

} */


var test = 2;
var varsportchange;
varsportchange = 2;
function picturechange(){
    switch(test){

        case 1: 
        document.getElementById("profilimage").src = "/assets/images/defaultimage.png";
        test = 2;
        break;
        case 2: 
        document.getElementById("profilimage").src = "/assets/images/wrongimage.png";
        test = 1;
        break;
    }
}


function sportchange(sport){
    //alert(sport)
    switch(sport){
        case "other": 
        document.getElementById("sportimage").src = "/assets/sports/default.png";
        varsportchange = 2;
        break;
        case "soccer": 
        document.getElementById("sportimage").src = "/assets/sports/soccer.png";
        varsportchange = 3;
        break;
        case "basket": 
        document.getElementById("sportimage").src = "/assets/sports/basket.png";
        varsportchange = 4;
        break;
        case "football": 
        document.getElementById("sportimage").src = "/assets/sports/football.png";
        varsportchange = 5;
        break;
        case "swimming": 
        document.getElementById("sportimage").src = "/assets/sports/swimming.png";
        varsportchange = 6;
        break;
        case "baseball": 
        document.getElementById("sportimage").src = "/assets/sports/baseball.png";
        varsportchange = 7;
        break;
        case "goodminton": 
        document.getElementById("sportimage").src = "/assets/sports/goodminton.png";
        varsportchange = 8;
        break;
        case "tennis": 
        document.getElementById("sportimage").src = "/assets/sports/tennis.png";
        varsportchange = 1;
        break;
    }
}