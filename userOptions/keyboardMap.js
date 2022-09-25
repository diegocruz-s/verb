const $letters = [...document.querySelectorAll('.attempts .row .letter')];
const keyboard = [...document.querySelectorAll('.keyboard .key')];

document.addEventListener('DOMContentLoaded', ()=>{
    
    $letters.forEach((letter)=>{
        letter.addEventListener('focus', ()=>{
            eventKeyboard = false;
        });
        letter.addEventListener('blur', ()=>{
            eventKeyboard = true; 
        });
        letter.addEventListener('input', ()=>{
            letter.value = letter.value.toUpperCase();
        })
    });

});

document.addEventListener('keyup', (e)=>{
    if(eventKeyboard){
        if(e.key === 'Backspace'){

            deleteLetter();
        }

        if(e.key === ' '){
            return;
        }

        if(!e.key.match(/^[A-z]{1}$/)){
            return;
        }

        fillLetter(e.key.toUpperCase());
    }else{
        return;
    }

});

keyboard.forEach((key)=>{

    key.addEventListener('click', ()=>{
        if(key.textContent === 'Enter'){return};
        if(key.classList[0] === 'deleteLetter'){
            deleteLetter();
            return;
        }
        fillLetter(key);
    })

})

function fillLetter(let){

    for(let letter of $letters){
        
        if(letter.disabled){
            continue;
        }
        if(letter.value == ''){
            letter.value = let.textContent || let;
            break;
        }
    }

}

function deleteLetter(){

    let filledLetters = $letters.filter((letter) => (letter.value != ''));
    const verifyLetters = checkLetters(filledLetters);
    if(!verifyLetters){
        return;
    }
    if(filledLetters.slice(-1)[0].disabled){
        return;
    }
    filledLetters.slice(-1)[0].value = '';

}


function checkLetters(arrayLetters){

    if(arrayLetters.length == 0){
        return false;
    }else{
        return true;
    }

}