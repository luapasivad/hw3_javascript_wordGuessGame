/* ------------
OUTLINE { Psychic Game }

- Press any key to start!
    - Listen for key
    - Allow game to start when key is pushed

- Computer picks a word to guess, 
    - displays that number of spaces
    - prompt user to press a letter

- User presses a key
    - check that it is a letter
    - check that it is not a letter already used
    - check to see if it is in the word

- Display letter pressed
    - in hangman space
    - or in letter's guessed

- Track number of guesses
    - lose after 10 guesses

- On win/loss
    - display appropriate message
    - restart game

*/



//words to be picked from
var wordBankArr = ["pistol", "horse", "lasso", "bandanna", "saloon"]
//gamestart variable check
var hasGameStart = false;
//empty variable for user guess
var userGuess = "";
//recording correct guesses
var userGuessArr = []
//
uniqueGuesses = []
//number of unique guesses
var tries = 10
//press any key to start
document.onkeyup = function(event) {
    var start = event.key
    if (start == event.key) {
        hasGameStart = true;
        
        document.getElementById("startCover").style.visibility = "hidden";
        document.getElementById("hangmanWord").textContent = cowboyWordSpaces;
        document.getElementById("guessRemain").textContent = tries + " guesses left!"; 
        document.getElementById("charUsed").textContent = uniqueGuesses;
    }
}

//word randomizer
var wordRandom = function(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

    
//word to be used each round
    cowboyWord = wordBankArr[wordRandom(5,0)]
//array for selected word spaces   
    cowboyWordSpaces = [];
//array for selected word characters
    cowboyWordSplit = cowboyWord.split("")
    console.log(cowboyWordSplit)
//forloop to count the number of spaces and put them into the array
    for (let i = 0; i < cowboyWord.length; i++)
        cowboyWordSpaces[i] = "_";


//user guess
document.onkeydown = function(guess) {    
    for(let i = 0; i < cowboyWordSplit.length; i++)
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
                console.log(tries + " guesses left!")
                //is the users guess in the word?
                if (cowboyWordSplit[i] === userGuess){
                    //console.log("correct guess!");
                    //making the space in the spaces array the
                    //correct user guess
                    cowboyWordSpaces[i] = userGuess;                             
                }      
            //if not a letter, we send a message
            } else {
                console.log("Please only type a single character A through Z")
            }
        }
    }
}

//how can I make only the letters not in the word show up


