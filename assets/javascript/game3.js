//--- GAME START / WORD PICK

//words to be picked from
var wordBankArr = ["pistol", "horse", "lasso", "bandanna", "saloon", "sherrif", "cowboy", "spur", "boots"]
//gamestart variable check
var hasGameStart = false;
//empty variable for user guess
var userGuess = "";
//array for selected word spaces   
var cowboyWordSpaces = [];
//number of unique guesses
var tries = 10
//unique characters guessed
var uniqueGuesses = []
//recording correct guesses
var userGuessArr = []

start()

function start() {
    document.getElementById("hangmanWord").textContent = cowboyWordSpaces.join("");
    document.getElementById("endCoverWin").style.visibility = "hidden";
    document.getElementById("endCoverLose").style.visibility = "hidden";  
    if (hasGameStart == false) {
        wordCreate()
        document.onkeyup = function(event) {
            var start = event.key
            if (start == event.key) {
                hasGameStart = true;        
                document.getElementById("startCover").style.visibility = "hidden";
                document.getElementById("guessRemain").textContent = tries + " guesses left!";
                document.getElementById("hangmanWord").textContent = cowboyWordSpaces.join(""); 
                document.getElementById("charUsed").textContent = "Guesses: " + uniqueGuesses;
            }
        }
    }
}


function wordRandom(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

//word to be used each round
function wordCreate() {
    cowboyWord = wordBankArr[wordRandom(9,0)]
    cowboyWordSplit = cowboyWord.split("") 
        console.log(cowboyWordSplit)
    for (let i = 0; i < cowboyWord.length; i++) {
    cowboyWordSpaces[i] = "_";
}}

//--- GAME SETUP



//--- PLAY

document.addEventListener("keydown", gameLogic) 

function gameLogic(guess){   

    //has the game started?
    if (hasGameStart && guess.key.length == 1 && guess.keyCode >= 65 && guess.keyCode <= 90) {
        
        userGuess = guess.key;
        
        //adding to guess array
        userGuessArr.push(userGuess);
        
        //making an array from the guess array of
        //individual guesses
        let uniqueGuessArr = [...new Set(userGuessArr)];
        uniqueGuesses = uniqueGuessArr;
        
        //the length of this array will give us how
        //many times they've guessed unique letters
        tries = 10 - uniqueGuesses.length
        gameResetLose();
        for(let i = 0; i < cowboyWordSplit.length; i++) {
        //is the users guess in the word?
        if (cowboyWordSplit[i] === userGuess){
            //making the space in the spaces array the
            //correct user guess
            cowboyWordSpaces[i] = userGuess;
            gameResetWin();
        }}
    
    //if not a letter, we send a message
    } else {
        console.log("Please only type a single character A through Z")
    }
}

//win condition
function gameResetWin() {
    if (cowboyWordSplit.toString() == cowboyWordSpaces.toString()) {
        document.getElementById("endCoverWin").style.visibility = "visible";
        document.removeEventListener("keydown", gameLogic)
        document.getElementById("guessRemain").textContent = "YOU WIN";
        console.log("YOU WIN"); 
        console.log("PRESS ANY KEY TO CONTINUE");
        document.addEventListener("keydown", reset)     
    }
}

//lose condition
function gameResetLose() {
    if (tries === 0) {
        document.getElementById("endCoverLose").style.visibility = "visible";
        console.log("YOU LOSE")
        console.log("PRESS ANY KEY TO CONTINUE");
        document.removeEventListener("keydown", gameLogic)
        document.addEventListener("keydown", reset)
    }
}

//game reset function
 function reset() {
    document.getElementById("endCoverWin").style.visibility = "hidden";
    document.getElementById("endCoverLose").style.visibility = "hidden";  
    userGuess = "";
    cowboyWordSpaces = [];
    tries = 10;
    uniqueGuesses = [];
    userGuessArr = [];
    wordCreate()
    document.removeEventListener("keydown", reset)
    document.addEventListener("keydown", gameLogic)
}
