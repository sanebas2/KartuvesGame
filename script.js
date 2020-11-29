function welcome() {
    alert("Ready to Play?");
  }

const gameData = {
    currentWord: "darbas",
    level: 1,
    progress: 0,
    possibleWords: ["suo", "kaunas", "klaipeda", "vilnius", "sofa", "armonika"],
    chooseRandomWord: function () {
        const randomIndex = Math.floor(Math.random() * this.possibleWords.length);
        this.currentWord = this.possibleWords[randomIndex];
    }
};

// Math.random(0.5) = 1
// Math.random(2.1) = 2
// Math.floor(2.8) = 2
// Math.ceil(2.1) = 3

const UI = {
    wordElement: document.querySelector(".word"),
    progressBar: document.querySelector(".bar"),
    winMessage: document.querySelector(".winMessage"),
    losMessage: document.querySelector(".losMessage"),
    rookie: document.querySelector(".rookie"),
    superStar: document.querySelector(".superStar"),
    hof: document.querySelector(".hof"),
    body: document.querySelector("body"),
    h3: document.querySelector("h3"),

}
let beep = new Audio();
beep.src = 'music/beep.mp3';
let check = new Audio();
check.src = 'music/check.mp3';
let win = new Audio();
win.src = 'music/win.mp3';
let loose = new Audio();
loose.src = 'music/loose.mp3';


function generateLetters() {
    UI.wordElement.innerHTML = "";

    for (let i = 0; i < gameData.currentWord.length; i++) {
        UI.wordElement.innerHTML += "<div></div>";
    }
}

function drawProgressBar() {
    UI.progressBar.style.width = `${gameData.progress}%`;
}

function initGame() {
    renderNewWord();
    drawProgressBar();
}

initGame();

// Kai žmogus paspaudžia klaviatūros mygtuką
document.addEventListener("keydown", (e) => {
    const letter = e.key;

    console.log(letter);

    let letterFound = false;

    // Patikrinti, ar tokia raidė egzistuoja žodyje
    for (let i = 0; i < gameData.currentWord.length; i++) {
        const wordLetter = gameData.currentWord[i];

        // Jei žmogus atspėjo raidę
        if (letter === wordLetter) {
            console.log(`Žaidėjas atspėjo raidę ${i} pozicijoje`);

            UI.wordElement.childNodes[i].innerHTML = letter;
            letterFound = true;
            check.play();
        }
    }

    // Patikriname, ar nebuvo rasta nei viena raidė
    if (letterFound === false) {
        console.log("Pridedame žmogui baudos taškų!");

        addProgress(10*gameData.level);
        
        beep.play();
    }

    checkLoseCondition();
    checkWinCondition();

});

UI.rookie.addEventListener("click", function () {

    UI.rookie.style.backgroundColor = 'green';
    UI.hof.style.backgroundColor = '#fbc531';
    UI.superStar.style.backgroundColor = '#fbc531';
    UI.progressBar.style.backgroundColor = 'green';
    console.log(`Buvo paspaustas rookie lygio mygtukas`);
    gameData.level = 1;
}
)
UI.superStar.addEventListener("click", () => {
    UI.superStar.style.backgroundColor = 'purple';
    UI.rookie.style.backgroundColor = '#fbc531';
    UI.hof.style.backgroundColor = '#fbc531';
    UI.progressBar.style.backgroundColor = 'purple';
    
    console.log(`Buvo paspaustas superstar lygio mygtukas`);
    gameData.level = 2;

})

UI.hof.addEventListener("click", () => {
    UI.hof.style.backgroundColor = 'red';
    UI.superStar.style.backgroundColor = '#fbc531';
    UI.rookie.style.backgroundColor = '#fbc531';
    UI.progressBar.style.backgroundColor = 'red';

    console.log(`Buvo paspaustas HOF lygio mygtukas`);
    gameData.level = 3;
})

function checkLoseCondition() {
    if (gameData.progress >= 100) {
        autoWord();
        loose.play();
        showLooser();
        gameData.progress = 0;
        drawProgressBar();
    }
}

function checkWinCondition() {
    for (let letterElement of UI.wordElement.childNodes) {
        if (letterElement.innerHTML === "")
            return;
    }
    
    autoWord();
    win.play();
    showWinner();
    gameData.progress = 0;
    drawProgressBar();
}


function showWinner() {

    for (let letterElement of UI.wordElement.childNodes) {
        if (letterElement.innerHTML === "")
        UI.winMessage.innerHTML = "Jus laimejote, pasleptas žodis yra:  <br>" + gameData.currentWord;
            UI.winMessage.style.display = "block";
            UI.body.style.background= "rgb(131,58,180)";
            UI.body.style.background= "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(179,63,63,1) 50%, rgba(205,155,85,1) 75%)";
            UI.h3.style.marginTop= "20px";
        setTimeout(function () {
            UI.winMessage.style.display = "none";
            UI.body.style.background= "black";
            UI.h3.style.marginTop= "300px";
        }, 4000);
    }
}

function showLooser() {

    for (let letterElement of UI.wordElement.childNodes) {
        if (letterElement.innerHTML === "")
            UI.losMessage.innerHTML = "Jus pralaimejote, pasleptas žodis yra: <br>" + gameData.currentWord;
            UI.losMessage.style.display = "block";
            UI.body.style.background= "rgb(159,132,82)";
            UI.body.style.background= "radial-gradient(circle, rgba(159,132,82,1) 0%, rgba(0,0,0,1) 100%)";
            UI.h3.style.marginTop= "20px";
        setTimeout(function () {
            UI.losMessage.style.display = "none";
            UI.body.style.background= "black";
            UI.h3.style.marginTop= "300px";
        }, 4000);
    }
}

function addProgress(progressAmount) {
    gameData.progress += progressAmount;
    gameData.progress = Math.min(100, gameData.progress);

   
    //  ar cia reiketu rasyti if funkcija del Level Buttonu paspaudimo, kad pakeisti zaidimo lygi???
    drawProgressBar();

}


function renderNewWord() {

    gameData.chooseRandomWord();
    generateLetters();
}

function autoWord () {

    setTimeout (()=>{renderNewWord()},4000)
}  

