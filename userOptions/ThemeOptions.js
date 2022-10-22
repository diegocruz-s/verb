const $chooseTheme = document.querySelector('.chooseTheme');
const $optionsTheme = document.querySelectorAll('.optionTheme');

$optionsTheme.forEach((optionTheme)=>{

    optionTheme.addEventListener('click', ()=>{
        
        theme = Number(optionTheme.classList[1].replace(/[A-z]/, ''));
        changeTheme(theme);
    })

})

function changeTheme(theme){

    if(theme === 1){
        $body.style.backgroundColor = '#000';
        $body.style.color = '#fff';
        $letters.forEach((letter)=>{
            letter.classList.add('letterDark');
            letter.style.borderColor = 'rgb(143, 143, 143)';
        })
    }else{
        $body.style.backgroundColor = '#fff';
        $body.style.color = '#000';
        $letters.forEach((letter)=>{
            letter.classList.add('letterWhite');
        })
    }

}