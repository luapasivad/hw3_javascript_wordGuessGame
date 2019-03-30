//--- GAME START / WORD PICK

//words to be picked from
var wordBankArr = ["pistol", "horse", "lasso", "bandanna", "saloon"]
//gamestart variable check
var hasGameStart = false;
//empty variable for user guess
var userGuess = "";
//
var playAgain = false

//win condition
function gameResetWin() {
    if (cowboyWordSplit.toString() == cowboyWordSpaces.toString()) {
        console.log("YOU WIN");
        reset() 
            
    }
}


function restart() {

}

//lose condition
function gameResetLose() {
    if (tries === 0) {
        console.log("YOU LOSE")
        reset() 
    }
}

 function reset() {
    userGuess = ""
    word()
    wordSplit()
    cowboyWordSpaces = [];
    cowboyWordSpacesCreate()
    tries = 10
    userGuessArr = []
    return
} 


start()

function start() {
    if (hasGameStart == false) {
        word()
        wordSplit()
        document.onkeyup = function(event) {
            var start = event.key
            if (start == event.key) {
                hasGameStart = true;        
                document.getElementById("startCover").style.visibility = "hidden";
                document.getElementById("hangmanWord").textContent = cowboyWordSpaces.join("");
                document.getElementById("guessRemain").textContent = tries + " guesses left!"; 
                document.getElementById("charUsed").textContent = uniqueGuesses;
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
function word() {
    cowboyWord = wordBankArr[wordRandom(5,0)]}


//--- GAME SETUP

//array for selected word spaces   
var cowboyWordSpaces = [];
//array for selected word - indiv. characters
function wordSplit() {
cowboyWordSplit = cowboyWord.split("") 
        console.log(cowboyWordSplit)}

//forloop to count the number of spaces and put them into the array
function cowboyWordSpacesCreate() {
    for (let i = 0; i < cowboyWord.length; i++)
        cowboyWordSpaces[i] = "_";
}

cowboyWordSpacesCreate()

//--- PLAY

//number of unique guesses
var tries = 10
//unique characters guessed
var uniqueGuesses = []
//recording correct guesses
var userGuessArr = []

document.onkeydown = function(guess) {   

    //has the game started?
    if (hasGameStart) {
        
        //has only one key been pressed?
        if (guess.key.length == 1) {
            
            //is it a valid letter?
            if (guess.keyCode >= 65 && guess.keyCode <= 90) {
                //variable for user guess
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
                for(let i = 0; i < cowboyWordSplit.length; i++)
                //is the users guess in the word?
                if (cowboyWordSplit[i] === userGuess){
                    //making the space in the spaces array the
                    //correct user guess
                    cowboyWordSpaces[i] = userGuess;
                    gameResetWin();
                }
            
            //if not a letter, we send a message
            } else {
                console.log("Please only type a single character A through Z")
            }
        }

    }
}
//can I make the loop stop if the if statement is true???
