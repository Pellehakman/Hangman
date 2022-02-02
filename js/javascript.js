
// Lägger till HTML element i JS

const getWord = document.querySelector('.get-word');
const falseBox = document.querySelector('.letter__box__false');
const restartButton = document.querySelectorAll('.restart__btn');
const man = document.querySelector('.figure__box');
const triesLeft = document.querySelector('.guesses__quant')

// Lägger in lite grund ord vi kan utöka vid önskan

const randomWords =  ['påsk', 'hare', 'godis', 'häxa', 'ägg'];


//Lite grund variabler, bra att ha functioner i spelet efter flödesschemat 

let counter = 60;
let startStopCounter = false;
let randomWord = '';
let correctGuessed = 0;
let guessesLeft = 5;
let numberOfCorrectGuesses = 0;
let pressedKeys = [];  // Gissat på (generelt)
let correctGuesses = []; // Gissat bokstav (rätt)
let guessedKeyIncorrect = []; // Gissat bokstav (fel)


// Funktion för att generera ett randomord från påsk array ovan

function generateRandomWord(){
    let random = Math.floor(Math.random() * randomWords.length);
    randomWord = randomWords[random];
    correctGuesses = [];
    pressedKeys = [];
    showWord(randomWord);
    console.log(randomWord);
;}

getWord.addEventListener('click', () => {
    generateRandomWord();
})

function showWord(word){ //Adds HTML code of the random Word
    const letterBox = document.querySelector('.letter__box__true');
    letterBox.innerHTML = '';
    falseBox.innerHTML = '';

    for(let i = 0; i < word.length; i++){
        letterBox.innerHTML += 
        `<div class="flex input__letter__true"><span class="hide" data-letter="${word[i]}"> ${word[i]}</span></div>`;
    }
}

function testLetter(str) { // Testing letters
    const test = /[a-öA-Ö]/.test(str);
    if(str.length > 1) {
        alert('Please enter an alphabetic character');
    } else if (test == false){
        alert('Please enter an alphabetic character');
    } else {
        return /[a-öA-Ö]/.test(str);
    }
}

function guessedletters(str) { // Testing letters
    let test = true;
    for(let i = 0; i < pressedKeys.length +1; i++){
        if(pressedKeys[i] == str){
            alert('You can´t press the same key twice');
            test = false;
            return test;
        }
    }
    if(test == true) {
        pressedKeys.push(str);
        return test;
    }
}

function addWrongletters(str) { // Adds wrong letter guesses to HTML
    falseBox.innerHTML +=
    `<div class="flex input__letter__false"><span id="">${str}</span></div>`;
}


function paintImg() { //Paints the hangman picture
    guessesLeft = guessesLeft - 1;
    triesLeft.innerHTML = guessesLeft;
    if(guessesLeft == 4){
        man.classList.add('scaffold');
    } else if (guessesLeft == 3){
        man.classList.add('head');
    } else if (guessesLeft == 2){
        man.classList.add('body');
    } else if (guessesLeft == 1){
        man.classList.add('arms');
    } else if (guessesLeft == 0){
        man.classList.add('legs');
        
    setTimeout( () => { // Display that u lost
        document.querySelector('.end__word').innerHTML = randomWord;
        document.querySelector('.end__box').classList.add('show')
    }, 1500)
    }
}

function testWon(str) { //Adds score and determine if u won
    let notFound = true;
    for(let i = 0; i < correctGuesses.length + 1; i++) {
        if(str == correctGuesses[i]) {
            notFound = false;
        }
    }
    if(notFound == true) {
        for(let j = 0; j < randomWord.length; j++) {
            if(str == randomWord[j]) {
                correctGuesses.push(str);
                if(correctGuesses.length == randomWord.length) {
                setTimeout( () => {
                    document.querySelector('.win__word').innerHTML = randomWord;
                    document.querySelector('.win__box').classList.add('show');
                }, 1500);
                }
            }
        }
    }
}


document.addEventListener('keydown', (evt) => { //Register keystroke
    const guessedLetter = evt.key;
    let checkAlpha = testLetter(guessedLetter);
    let checkPressed = guessedletters(guessedLetter);
    let dataLetter = '';

    let letters = document.querySelectorAll('.input__letter__true');
    console.log(checkAlpha, checkPressed)
    if(checkAlpha == true && checkPressed == true) { // checks if pressed key is neither a non alphabetic letter or has been used before
        if (startStopCounter == false) {
            startTimer(); 
        }
        startStopCounter = true;
        for(let letter of letters) {
            dataLetter = letter.firstChild.getAttribute('data-letter');
            if(dataLetter == guessedLetter){
                letter.firstChild.classList.remove('hide');
                correctGuessed++;
                testWon(guessedLetter);
            }
        }
        if(correctGuessed < 1) {
            paintImg()
            addWrongletters(guessedLetter)
        }
        guessedKeyIncorrect.push(guessedLetter)
        correctGuessed = 0;
    }
})
console.log(randomWord)
generateRandomWord(randomWord)


// countdown timer

function startTimer() {
    const timerIntervalId = setInterval(() => {
        counter--;
        if(counter > 0){
    
            id = document.getElementById('count');
            id.innerHTML = counter;
        } else if (counter <= 0 && correctGuesses.length != randomWord.length && guessesLeft > 0) { // Display that u lost
            document.querySelector('.end__word').innerHTML = randomWord;
            document.querySelector('.end__box').classList.add('show')
            endTimer();
        }
    }, 1000) 

    function endTimer() {
        clearInterval(timerIntervalId);
    }
    getWord.addEventListener('click', () =>{
        endTimer();
        restart();
    })
    for(let i = 0; i < restartButton.length; i++){
        restartButton[i].addEventListener('click', () => {
            endTimer();
            totalRestart()
        })
    }
}


function restart() {
    startStopCounter = false;
    counter = 60;
    id.innerHTML = counter;
    
    man.classList.remove('scaffold') 
    man.classList.remove('head')
    man.classList.remove('body')
    man.classList.remove('arms')
    man.classList.remove('legs')

    guessesLeft = 5
    triesLeft.innerHTML = guessesLeft;
}

function totalRestart() {
    restart()
    document.querySelector('.end__box').classList.remove('show')
    document.querySelector('.win__box').classList.remove('show')
    generateRandomWord()
}