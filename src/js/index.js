const pages = require('./pages');

async function firstPage(){
    await page.addApp("app1");
}

async function addAppButton(){
    let button = await document.querySelector("#add button")
    await button.addEventListener('click',handlerAddButton);
}

function handlerAddButton(e){
    page.addApp(page.getFreeID())
}

//Begin

//Create object page who store page data
var page = new pages.Page()

//check if there is any data in local stotage 
if (localStorage.pages == undefined){
    firstPage();
}else{
    page.loadFromLocalStorage();
}

addAppButton();
