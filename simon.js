let gameSeq = [];
let userSeq = [];

let highestScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;


let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();

    }
    
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);

}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() *4);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    // console.log(randIdx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    btnflash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        if (level - 1 > highestScore) {
        highestScore = level - 1;
    }
        // Wrong!
        h2.innerHTML = `Game over! Your score was <b>${level -1}</b><br> Highest score: <b> ${highestScore} </b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    } else if (userSeq.length === gameSeq.length) {
        // User finished the current level
        setTimeout(levelUp, 1000);
    }
}


function btnpress(){
    console.log(this);
    let btn = this;
    btnflash(btn);

    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnpress)
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}