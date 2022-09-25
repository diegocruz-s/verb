//const words = Words;

// para verbos
const words = Verbs;
let endGame = false;
let word;
let numberOfAttempts = -1;
let colorLetter = [];
const $rows = [...document.querySelectorAll('.row input')];

const game = {

    drawWord: function(){
        const rangeWord = words.length;
        const drawNumber = Math.floor(Math.random() * rangeWord);

        word = words[drawNumber].text.toUpperCase();
        console.log(word);
        return;
    },

    valueRow: function(){
        numberOfAttempts++;

        return numberOfAttempts;
    },

    checkRow: function(){
        const $divLetters = [...document.querySelectorAll(`[data-numberRow=r${(numberRow)}] input`)];
    
        $rows.forEach(letter=>{
            letter.disabled = true;
        })

        $divLetters.forEach((letter)=>{
            letter.disabled = false;
        })
        
    },

    verifyWord: function(newWord){
        colorLetter = [];
        let numberLetterWord = 0

        return new Promise((resolve, reject)=>{
            if(newWord.length != 5){
                
                return reject({ msg: 'Somente palavras com 5 letras!' })
            }

            const testLetters = {  
                sameLetters(){
                    colorLetter.push({color: 'green'});
                },
                haveLyric(){
                    colorLetter.push({color: 'yellow'});

                },
                notContainLetter(){
                    colorLetter.push({color: 'black'});
                }
            }
            
            for(let letter of newWord.toUpperCase()){

                if(letter == word[numberLetterWord]){
                    testLetters.sameLetters();
                }else if(word.includes(letter)){
                    testLetters.haveLyric();
                }else{
                    testLetters.notContainLetter();
                }
                numberLetterWord++;
            }
            const checkEndgame = colorLetter.filter((item)=>item.color === 'green')
            if(checkEndgame.length === 5){
                endGame = true;
            }else{
                endGame = false;
            }

            
            resolve({colorLetter, endGame});
            
        })

    },

    gameOver: function(){
        const verifyGameOver = colorLetter.filter((col)=>col.color === 'green')
        if($rows.slice(-1)[0].value != '' && verifyGameOver.length < 5){
            return true;
        }else{
            return false;
        }
    },

    restart: function(){
        numberOfAttempts = -1;
        $rows.forEach((row)=>{
            row.value = '';
            row.style.backgroundColor = 'rgb(245, 245, 245)'
        })
        endGame = false;
        this.drawWord();
        colorLetter = [];
        console.log(word);
    },

}

game.drawWord();
