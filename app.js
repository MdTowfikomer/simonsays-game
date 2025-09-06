let btnsClass = ["box1", "box2", "box3", "box4"];
let body = document.querySelector('body');
let gameStart = false;
let level = 0;

document.addEventListener("keypress", function(){ //event,callback
    if(gameStart == false){
        console.log("game started..!");
        gameStart = true;
    }

    levelUp(); // function for flashing random box
});

// starting by using button

let strBtn = document.querySelector(".start");

strBtn.addEventListener("click", function(){ //event,callback
    if(gameStart == false){
        console.log("game started..!");
        gameStart = true;
    }
    strBtn.style.display = "none";
    levelUp(); // function for flashing random box
});




function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 550);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}

function overBackground(btn){
    btn.classList.add("over");
    setTimeout(function(){
        btn.classList.remove("over");
    }, 250);
}


let heading = document.querySelector('h2'); //class id elementname

let gameSeq = [];
let userSeq = [];
let para = document.createElement('h3');
para.style.margin = "0px";
para.style.textAlign = "center";

heading.insertAdjacentElement("afterend", para);  

function levelUp(){
    userSeq = [];
    level++;
    
if (level === 1) {
  para.innerText = "Click the flashed button…!";
} 
else if (level === 2) {
  para.innerText = "Repeat the pattern from start…";
  // blink red 3 times
  let count = 0;
  const blinkId = setInterval(() => {
    para.classList.toggle("redBlink");
    count++;
    if (count > 10) {         // toggle 6 times (~3 blinks)
      clearInterval(blinkId);
      para.classList.remove("redBlink");
    }
  }, 200);
} 
else if (level === 3) {
  para.style.color = "black";
  para.innerText = "Nice, you're doing good!";
} 
else if (level > 4 && level % 2 === 0) {
  para.innerText = "Keep going…!";
} 
else {
  para.innerText = "Nice, let's go…!";
}


    heading.innerText = `level ${level}`;
    let ranIdx = Math.floor(Math.random() * btnsClass.length);
    let ranBoxClass = btnsClass[ranIdx];
    gameSeq.push(ranBoxClass);
    console.log(gameSeq);
    let ranBox = document.querySelector('.'+ranBoxClass);
    gameFlash(ranBox);
}


function check(idx){
    if(userSeq[idx] == gameSeq[idx]){
       if(gameSeq.length == userSeq.length){
           setTimeout(levelUp(), 1500);
       } 
    } else{
        heading.innerText = "GAME OVER! press any key to restart";
        heading.style.color = "black";
        para.innerHTML = "";

        overBackground(body);
        restart();

    }
}


function buttonPress(){
    let btn = this; // which ever button calls it, this will become that..!
    userFlash(btn);
    userChoose = btn.getAttribute("id");
    userSeq.push(userChoose);
    console.log(userSeq.length-1)

    check(userSeq.length-1);
}

let btns = document.querySelectorAll('.boxes');

for(btn of btns){
    btn.addEventListener('click', buttonPress);
}

function restart(){
    gameStart = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    heading.style.color = "black";
    
     if (window.matchMedia("(max-width: 768px)").matches) {
        strBtn.style.display = "inline"; // visible on medium screens
    } else {
        strBtn.style.display = "none";   // hidden on small/large screens
    }
}