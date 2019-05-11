// Variables 
var wordOptions = ["superman", "batman", "spiderman", "hulk", "ironman", "aquaman", "mermaidman", "barnacleboy", "catwoman", "antman", "blackpanther", "captainamerica", "daredevil", "doctorstrange", "greenlantern", "thor", "robin", "wasp", "supergirl", "wolverine", "wonderwoman"];
var word = "";
var letters = [];
var blanks = 0;
var blanksAndGuessed = [];
var wrongGuesses = [];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var shotFiredSound;
var themeSong;


shotFiredSound = new sound("assets/sounds/shot.mp3");
themeSong = new sound("assets/sounds/theme.mp3");

// Functions
//New game function. Selects new word, resets variables (except wins and losses for score-keeping purposes) and console logs them.
function newGame () {
    word = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    letters = word.split("");
    blanks = letters.length;
    guessesLeft = 8;
    wrongGuesses = [];
    blanksAndGuessed = [];
    console.log(word);
    console.log(letters);
    console.log(blanks);
    console.log(guessesLeft);
    console.log(wrongGuesses);
    console.log(blanksAndGuessed);

    //Pushing new underscore into blanksAndGuessed array for each letter in the subject word and console logging.
    for (var i=0; i<blanks; i++){
        blanksAndGuessed.push("_");
    }
    console.log(blanksAndGuessed);

    //Changing HTML of the subjectWord ID, or the part that shows blanks on the game card to show number of underscores from above for loop. Inserting variable numbers into empty HTML span elements.
    document.getElementById("subjectWord").innerHTML = blanksAndGuessed.join(" ");
    document.getElementById("remainingGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = wins;
    document.getElementById("lossCounter").innerHTML = losses;
    document.getElementById("wrongLetters").innerHTML = wrongGuesses;
    document.getElementById("caption").innerHTML = "Pick any letter to take shots at Tuco's noose to free him from the gallows.";
    document.getElementById("tuco").src = "assets/images/tuco1.jpg"

}

//When user releases letter key, letterGuessed variable is assigned and console.logged. CheckWord function runs
document.onkeyup = function(event) {
    shotFiredSound.play();
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(letterGuessed);
    checkWord(letterGuessed);
    endTurn();
}

//Checking subject word for the letterGuessed variable registered on key release.
//If letterInWord, change the corresponding blanks in the word to the letter guessed.
//If letter isn't in the subject word, add the letter guessed to the wrongGuesses array and subtract one from guesses remaining.
//Updating HTML according to the user's game stats after each key hit.
//Console logging guesses left, wrong guesses array, and blanksAndGuessed array after console log of letterGuessed...
function checkWord(letter) {
    var letterInWord = false;
    for (var i=0; i<blanks; i++){
        if(word[i] == letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (var i=0; i<blanks; i++) {
            if (word[i] == letter) {
                blanksAndGuessed[i] = letter;
                document.getElementById("remainingGuesses").innerHTML = guessesLeft;
                document.getElementById("subjectWord").innerHTML = blanksAndGuessed.join(" ");
                document.getElementById("wrongLetters").innerHTML = wrongGuesses.join(" ");
            }
        }
    }
    else {
        wrongGuesses.push(letter);
        guessesLeft--;
        document.getElementById("remainingGuesses").innerHTML = guessesLeft;
        document.getElementById("subjectWord").innerHTML = blanksAndGuessed.join(" ");
        document.getElementById("wrongLetters").innerHTML = wrongGuesses.join(" ");
    }

    console.log(guessesLeft);
    console.log(wrongGuesses);
    console.log(blanksAndGuessed);
}

//Checking to see if the user won or lost. Changing images based on how many guesses are left. Generating a win/loss message if they have, and updating the win/loss count on the game card.
function endTurn() {
    if (guessesLeft < 5 && guessesLeft > 0) {
        document.getElementById("tuco").src = "assets/images/tuco2.jpg";
    }
    if (letters.toString() == blanksAndGuessed.toString()) {
        wins++;
        document.getElementById("caption").innerHTML = "You freed Tuco! Click the noose in the top left to play again with a new word!";
        document.getElementById("winCounter").innerHTML = wins;
        document.getElementById("tuco").src = "assets/images/tuco4.jpg";
    }
    else if (guessesLeft == 0) {
        losses++;
        document.getElementById("caption").innerHTML = "Tuco's dead. Don't feel too bad. He was wanted by the Federales for a long list of crimes. You can try again with a new word by clicking the noose in the top left.";
        document.getElementById("lossCounter").innerHTML = losses;
        document.getElementById("tuco").src = "assets/images/tuco3.jpg";
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

//Runs newGame function
newGame();