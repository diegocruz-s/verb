let theme;
let numberRow;
let eventKeyboard = true;

// Unrelated to the game

    //Catch elements
const $body = document.querySelector('body');
const $btnHowToPlay = document.querySelector('.howPlay');
const $btnDeleteTutorial = document.querySelector('.removeTutorial');
const $enter = document.querySelector('.enter');
const $restartConclude = document.querySelectorAll('.restart')[0];
const $restartGameOver = document.querySelectorAll('.restart')[1];
const $paragError = document.querySelector('.paragError');
const $endgame = document.querySelector('.endgame')
const $gameOver = document.querySelector('.gameOver');
const $msgGameOver = document.querySelector('.msgGameOver');
const $correctWord = document.querySelector('.correctWord');
const $howToPlay = document.querySelector('.howToPlay')
    //Document events
document.addEventListener('DOMContentLoaded', initialGame);

document.addEventListener('keyup', (e)=>{
    $paragError.textContent = '';
    $paragError.style.display = 'none';
    
    if(e.key === 'Enter'){
        if($endgame.style.display == 'flex' || $endgame.style.display == 'flex'){
            return;
        };
        $paragError.textContent = '';
        $paragError.style.display = 'none';
        submitWord();

        if(game.gameOver()){
            eventKeyboard = false;
            changeScreenGameOver();
        }
        
    }
})

$enter.addEventListener('click', ()=>{
    $paragError.textContent = '';
    $paragError.style.display = 'none';
    submitWord();

    if(game.gameOver()){
        changeScreenGameOver();
    }
    
});

$btnHowToPlay.addEventListener('click', ()=>{
    $howToPlay.classList.toggle('dispBlock');
});

$btnDeleteTutorial.addEventListener('click', ()=>{
    $howToPlay.classList.remove('dispBlock');
});

$restartConclude.addEventListener('click', ()=>{
    game.restart();
    restartInterface();
    initialGame();
});

$restartGameOver.addEventListener('click', ()=>{
    game.restart();
    restartInterface();
    initialGame();
});


    //Functions

function initialGame(){
    changeRow();

    setInterval(()=>{
        word = game.drawWord();
    }, 86400000);

}
function submitWord(){
    const divLetters = [...document.querySelectorAll(`[data-numberRow=r${(numberRow)}] input`)];
    let newWord = '';
    for(let divLetter of divLetters){
        newWord += `${divLetter.value}`
    }

    game.verifyWord(newWord)
    .then((answer)=>{
        for(let i=0;i<=4;i++){
            divLetters[i].style.backgroundColor = `${answer.colorLetter[i].color}`;
        }
        changeRow();
        if(answer.endGame){
            setTimeout(()=>{
                $endgame.style.display = 'flex';
            },1010)
        }
    })
    .catch((err)=>{
        console.log(err.msg);
        $paragError.textContent = err.msg;
        $paragError.style.display = 'block';
    });

}
function changeRow(){
    numberRow = game.valueRow();
    game.checkRow();
}
function restartInterface(){
    $paragError.style.display = 'none';
    $gameOver .style.display = 'none';
    $endgame.style.display = 'none';
}

function changeScreenGameOver(){
    setTimeout(()=>{
        $correctWord.innerHTML = `A palavra correta era <span class="word">${word}</span>`;
        $msgGameOver.textContent = `Você errou a palavra, tente novamente quando quiser.`;
        $gameOver .style.display = 'flex';
    },1010)
};
