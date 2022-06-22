
/* 
MODIFIER LES ID ET LES CLASS DU FIST NAME DANS LE PROFIL CAR IL Y A 2 IDs
BON LUNDI A TOI DE VENDREDI DERNIER 

*/
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




function profilchange(profilpicture){
    //alert(sport)
    switch(profilpicture){
        case "PhysicalShapeA": 
        document.getElementById("profilimage").src = "/assets/profilpictures/pp1.png";
        break;
        case "PhysicalShapeB": 
        document.getElementById("profilimage").src = "/assets/profilpictures/pp2.png";
        break;
        case "PhysicalShapeC": 
        document.getElementById("profilimage").src = "/assets/profilpictures/pp3.png";
        break;
        case "PhysicalShapeD": 
        document.getElementById("profilimage").src = "/assets/profilpictures/pp4.png";
        break;
        case "PhysicalShapeE":
        document.getElementById("profilimage").src = "/assets/profilpictures/pp5.png";
        break;
        case "PhysicalShapeF": 
        document.getElementById("profilimage").src = "/assets/profilpictures/pp6.png";
        break;
        case "PhysicalShapeG": 
        document.getElementById("profilimage").src = "/assets/profilpictures/pp7.png";
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

