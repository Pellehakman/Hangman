
// Lägger till HTML element i JS

const getWord = document.querySelector('.get-word');

// Lägger in lite grund ord vi kan utöka vid önskan

const randomWords =  ['PÅSK', 'HARE', 'GODIS', 'HÄXA', 'ÄGG'];


 //Lite grund variabler, bra att ha functioner i spelet efter flödesschemat 

let randomWord = '';
let numberOfIncorrectGuesses = 0;
let numberOfCorrectGuesses = 0;
let guessKeys = [];  // Gissat bokstav (rätt)
let  guessedKeyIncorrect = []; // Gissat bokstav (fel)


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
        `<div class="flex input__letter__true"><span class="hide" data-letter=" ${word[i]} "> ${word[i]}</span></div>`;
    }
})

function testLetter(str) {
    return /^[a-öA-Ö]+$/.test(str);
}


document.addEventListener('keydown', (evt) => {
    const guessedLetter = evt.key;
    let check = testLetter (guessedLetter);
    let divLetter = '';

    let letters = document.querySelectorAll('.input__letter__true');
    console.log(letters)
    if(check == true) {
        for(let letter of letters) {
            divLetter = letter.getAttribute('data-letter')
            console.log(divLetter)
            if(letter == guessedLetter){
                letter.getElementByTagName('span').classlist.toggle('hide');
            }
        }
    }
})