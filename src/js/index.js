const City = document.getElementById("city")
const submitButton = document.getElementById("submit")

const ApiKey = 'MGvG0TzQVeBUgVYcA19kvGzGFroIG5bE'

const axios = require('axios');

const pages = require('./pages');




async function updatePage(){
    
    await page.addPage("app1")

    let button = await document.querySelector("#add button")

    await button.addEventListener('click',add);
    return page
    
}

function add(e){
    page.addPage(page.newID())
}

var page = new pages.Page()
updatePage()








