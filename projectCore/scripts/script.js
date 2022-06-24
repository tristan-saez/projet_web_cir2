/**
* @Author: Tristan Saëz & Antonin Soquet
* @Company: ISEN Yncréa Ouest
* @Email: tristan.saez@isen-ouest.yncrea.fr - antonin.soquet@isen-ouest.yncrea.fr
*/    

var varsportchange;
varsportchange = 2;

function sportchange(sport){ //Allow the picture of the selected sport to change automatically whenever the user change its selection. 
    //alert(sport)
    document.getElementById("islessknownsport").style.display = "none";
    switch(sport){
        case "other": 
        document.getElementById("sportimage").src = "/assets/sports/default.png";
        varsportchange = 2;
        document.getElementById("islessknownsport").style.display = "block";
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





function rating(shootingstar){
    ratingreset();
    console.log(shootingstar)
switch(shootingstar){
    case 1:
        document.getElementById("star1").src = "/assets/rating/star.png";
        break;
    case 2:
        document.getElementById("star1").src = "/assets/rating/star.png";
        document.getElementById("star2").src = "/assets/rating/star.png";
        break;
    case 3:
        document.getElementById("star1").src = "/assets/rating/star.png";
        document.getElementById("star2").src = "/assets/rating/star.png";
        document.getElementById("star3").src = "/assets/rating/star.png";
        break;
    case 4:
        document.getElementById("star1").src = "/assets/rating/star.png";
        document.getElementById("star2").src = "/assets/rating/star.png";
        document.getElementById("star3").src = "/assets/rating/star.png";
        document.getElementById("star4").src = "/assets/rating/star.png";
        break;
    case 5:
        document.getElementById("star1").src = "/assets/rating/star.png";
        document.getElementById("star2").src = "/assets/rating/star.png";
        document.getElementById("star3").src = "/assets/rating/star.png";
        document.getElementById("star4").src = "/assets/rating/star.png";
        document.getElementById("star5").src = "/assets/rating/star.png";
        break;

}   
}


function ratingreset(){
        document.getElementById("star1").src = "/assets/rating/star 1.png";
        document.getElementById("star2").src = "/assets/rating/star 1.png";
        document.getElementById("star3").src = "/assets/rating/star 1.png";
        document.getElementById("star4").src = "/assets/rating/star 1.png";
        document.getElementById("star5").src = "/assets/rating/star 1.png";
}
