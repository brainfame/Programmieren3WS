let clickCounter = 0;
function clickDealer(evt){
    //console.log(evt);
    clickCounter++;
    let str = "pleasure doing buissnis with you";
    let str2 = clickCounter;
    this.innerText = str, str2;
}

let p = document.getElementById("pElement");

p.addEventListener("click", clickDealer);

function bodyClick(evt){
    console.log("click at: ", evt.pageX, evt.PageY);
}

window.onclick = bodyClick;

function pageLoaded(evt){
    console.log("Laden fertig... bitte Spiel starten... ")
}

window.onload = pageLoaded;

function keyup(evt){
    console.log("keyboard pressed: ", evt.key);
}

window.onkeyup = keyup;

function keyPressed(){
    console.log(evt);
}
