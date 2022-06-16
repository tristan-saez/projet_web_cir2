
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

}