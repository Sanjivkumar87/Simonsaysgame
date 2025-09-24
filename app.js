let gameSeq = [];
let userSeq = [];
let btns = ["red","yellow","green","blue","purple"];
let started = false;
let level = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

const levelTitle = document.getElementById("level-title");
const scoreDisplay = document.getElementById("score");

document.addEventListener("keydown", () => {
    if(!started){
        started = true;
        levelUp();
    }
});

// Play sound for each button
function playSound(color) {
    let audio;
    switch(color) {
        case "red": audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"); break;
        case "yellow": audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"); break;
        case "green": audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"); break;
        case "blue": audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"); break;
        case "purple": audio = new Audio("https://www.soundjay.com/button/beep-7.mp3"); break;
        case "wrong": audio = new Audio("https://www.soundjay.com/button/beep-10.mp3"); break;
    }
    audio.play();
}

// Flash button with glow & sound
function flashButton(btn) {
    btn.classList.add("flash");
    playSound(btn.id);
    setTimeout(()=> btn.classList.remove("flash"), 400);
}

// User click flash
function userFlash(btn) {
    btn.classList.add("userflash");
    playSound(btn.id);
    setTimeout(()=> btn.classList.remove("userflash"), 300);
}

// Next level / sequence
function levelUp() {
    userSeq = [];
    level++;
    levelTitle.textContent = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*btns.length);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    let randBtn = document.getElementById(randColor);
    flashButton(randBtn);
}

// Check user answer
function checkAnswer(idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            score++;
            if(score > highScore){
                highScore = score;
                localStorage.setItem("highScore", highScore);
            }
            updateScore();
            setTimeout(levelUp, 1000);
        }
    } else {
        playSound("wrong");
        levelTitle.innerHTML = `Game Over! Score: <b>${score}</b><br>Press any key to restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(()=> document.body.style.backgroundColor="#0f0c29", 200);
        resetGame();
    }
}

function updateScore(){
    scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`;
}

// Button click handler
function btnClick() {
    const btn = this;
    userSeq.push(btn.id);
    userFlash(btn);
    checkAnswer(userSeq.length-1);
}

document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", btnClick));

function resetGame(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0;
    updateScore();
}

// Initialize high score on load
updateScore();
