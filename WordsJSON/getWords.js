const puppeteer = require('puppeteer');
const fs = require('fs');

async function catchWords(){

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    for(let i=1;i<50;i++){

        await page.goto(`https://www.conjugacao.com.br/verbos-populares/${i}/`);
        let textList = await page.evaluate(()=>{

            const reg = /^[\w]{5}$/;

            let nodeList = document.querySelectorAll('#content .wrapper ul li');

            let arrayList = [...nodeList];

            let newArrayList = arrayList.map(text=>({text:text.textContent}));

            let textList = newArrayList.filter(element=>element.text.match(reg));


            nodeList = null;
            listArray = null;
            newArrayList = null;

            return textList;

        })

        fs.appendFileSync('Verb.json', JSON.stringify(textList, null, 2), (e)=>{
            if(e){
                console.log(e);
            }else{
                console.log('OK fs!');
            }
        });

    }

}

catchWords();
