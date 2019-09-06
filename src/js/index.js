const City = document.getElementById("city")
const submitButton = document.getElementById("submit")

const ApiKey = 'MGvG0TzQVeBUgVYcA19kvGzGFroIG5bE'

const axios = require('axios');

const pages = require('./pages');




async function updatePage(){
    
    await page.addPage("app1")

    return page
    
}
async function addButton(){
    
    let button = await document.querySelector("#add button")

    await button.addEventListener('click',add);
}


function add(e){
    page.addPage(page.newID())
}

var page
if (localStorage.pages == undefined){
    console.log("1-")
    page = new pages.Page()
    updatePage();
    addButton();
}else{
    console.log("2-")
    page = new pages.Page()
    page.load()
    addButton();
}









