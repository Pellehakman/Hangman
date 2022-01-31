
// Lägger till HTML element i JS

const getWord = document.querySelector('.get-word');

// Lägger in lite grund ord vi kan utöka vid önskan

const randomWords =  ['påsk', 'hare', 'godis', 'häxa', 'ägg'];


 //Lite grund variabler, bra att ha functioner i spelet efter flödesschemat 

let randomWord = '';
let correctGuessed = 0;
let guessesLeft = 5;
let numberOfCorrectGuesses = 0;
let pressedKeys = [];  // Gissat på (generelt)
let guessedKeyIncorrect = []; // Gissat bokstav (fel)


// Funktion för att generera ett randomord från påsk array ovan

function generateRandomWord(){
    let random = Math.floor(Math.random() * randomWords.length);
    randomWord = randomWords[random];
    return randomWord
;

}

getWord.addEventListener('click', () => {
    const letterBox = document.querySelector('.letter__box__true')
    letterBox.innerHTML = '';

    let word = generateRandomWord();

    for(let i = 0; i < word.length; i++){
        letterBox.innerHTML += 
        `<div class="flex input__letter__true"><span class="hide" data-letter="${word[i]}"> ${word[i]}</span></div>`;
    }
})

function testLetter(str) {
    return /^[a-öA-Ö]+$/.test(str);
}

function guessedletters(str) {
    let test = false;
    for(let i = 0; i < pressedKeys.length +1; i++){
        if(pressedKeys[i] == str){
            test = false
            return test;
        } else {
            pressedKeys.push(str)
            test = true;
            console.log(test)
            return test;
        }
    }
}

function paintImg() {
    const man = document.querySelector('.figure__box');
    guessesLeft = guessesLeft - 1;

    if(guessesLeft == 4){
        man.classList.add('scaffold')
    } else if (guessesLeft == 3){
        man.classList.add('head')
    } else if (guessesLeft == 2){
        man.classList.add('body')
    } else if (guessesLeft == 1){
        man.classList.add('arms')
    } else if (guessesLeft == 0){
        man.classList.add('legs')
        
    setTimeout( () => {
        document.querySelector('.end__word').innerHTML = randomWord;
        document.querySelector('.end__box').classList.add('show')
    }, 1000)
    }
}

document.addEventListener('keydown', (evt) => {
    const guessedLetter = evt.key;
    let checkAlpha = testLetter(guessedLetter);
    let checkPressed = guessedletters(guessedLetter)
    let divLetter = '';

    let letters = document.querySelectorAll('.input__letter__true');
    console.log(checkAlpha, checkPressed)
    if(checkAlpha == true && checkPressed == true) {
        for(let letter of letters) {
            divLetter = letter.firstChild.getAttribute('data-letter');
            if(divLetter == guessedLetter){
                letter.firstChild.classList.remove('hide');
                correctGuessed++;
                numberOfCorrectGuesses++;
                if(numberOfCorrectGuesses == randomWord.length){
                    document.querySelector('.win__word').innerHTML = randomWord;
                    document.querySelector('.win__box').classList.add('show')
                }
            }
        }
        if(correctGuessed < 1) {
            paintImg()
        }
    correctGuessed = 0;
    }
})