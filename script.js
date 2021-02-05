'use strict';
/*
    WEB230 Final Project Winter 2020
    {Yash Kumar}
*/
let words = ['Barrie',
             'Belleville',
             'Brampton',
             'Brant',
             'Brantford',
             'Brockville',
             'Burlington',
             'Cambridge',
             'Cornwall',
             'Dryden',
             'Dryden',
             'Sudbury',
             'Guelph',
             'Hamilton',
             'Kenora',
             'Kingston',
             'Kitchener',
             'London',
             'Markham',
             'Mississauga',
             'Orillia',
             'Oshawa',
             'Ottawa',
             'Pembroke',
             'Peterborough',
             'Pickering',
             'Colborne',
             'Sarnia',
             'Stratford',
             'Thorold',
             'Timmins',
             'Toronto',
             'Vaughan',
             'Waterloo',
             'Welland',
             'Windsor',
             'Woodstock'];
function randomWord(){
    return Math.floor(Math.random()*37);
}

function reset(){
    section2[0].removeEventListener('click', eventHandler);
    window.removeEventListener('keydown',eventHandler2);
    document.getElementsByTagName('p')[0].style.display = 'block';  
    picture.onclick = function(){
        picture.src = 'images/hang0.png';
        let letters = Array.from(document.querySelectorAll('span'));
        letters.forEach(x => {x.classList.remove('used'); })
        emptyArray();
       
        word = words[randomWord()];
        word = word.toUpperCase();
        blankWord.textContent = underscore(word);
        chances = 6;
        document.getElementsByTagName('p')[0].style.display = 'none';
        section2[0].addEventListener('click',eventHandler);
        window.addEventListener('keydown',eventHandler2);
    }
}
function emptyArray(){
     wordArray = [];
     blankWordArray = [];
}
let section = document.getElementsByClassName('word');
let word = words[randomWord()];
word = word.toUpperCase();
let wordArray = [];
let blankWord = document.createElement('article');
let blankWordArray = [];
let chances = 6;
let picture = document.getElementById('hangman');
function underscore(word){
    let space = '';
    for(let i = 0; i < word.length; i++){
        space += '_';
        wordArray.push(word.charAt(i));
        blankWordArray.push('_');
    }
    return space;
}
blankWord.classList.add('wordLength');
blankWord.textContent = underscore(word);
section[0].appendChild(blankWord);
let section2 = document.getElementsByClassName('letters');
section2[0].addEventListener('click',eventHandler);
window.addEventListener('keydown',eventHandler2);


function verify(l){
    let char = l.includes;
    if(char >31 && char !=32 && (char<65 || char>90) && (char <97 || char >122)){
        alert("Please use alphabet key");
    }
    
   else if(wordArray.includes(l)){
        while (wordArray.includes(l)){
            let a = wordArray.findIndex(j => j === l);
            let z = blankWord.textContent.charAt(a).replace('_',l);
            wordArray.splice(a,1,'_');
            blankWordArray.splice(a,1,z);
        }
        let guessWord = blankWordArray.join('');
        blankWord.textContent = guessWord;
        if(win(guessWord)){
            picture.src = 'images/win.png';
            reset();
        }
    }else{
        chances--;
        if(chances == 0){
            picture.src = 'images/hang6.png';
            reset();
        }else{
            switch(chances){
                case 1: picture.src='images/hang5.png';
                    break;
                case 2: picture.src='images/hang4.png';
                    break;
                case 3: picture.src='images/hang3.png';
                    break;
                case 4: picture.src='images/hang2.png';
                    break;
                case 5: picture.src='images/hang1.png';
                    break;
            }
        }
    }
}

function eventHandler2(e){
    let keyEntered = String.fromCharCode(e.keyCode);
    let target = document.getElementById(keyEntered);
    if(!target.classList.contains('used')){
        target.classList.add('used');
        verify(keyEntered)
    }
}

function eventHandler(e){
    let target = e.target.nodeName;
    if (target == 'SPAN' && !e.target.classList.contains('used')){
      e.target.classList.add('used');
        let letter = e.target.childNodes.item(0).textContent;
        verify(letter);
    }
}

function win(guess){
    if(guess == word){
        return true;
    }
    return false;
}