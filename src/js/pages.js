const apps = require('./apps');


class Page {

    constructor() {

        this.listApp = {};
        this.deleteButton = {};
    }

    async addApp(id){

         this.listApp[id] = await new apps.App(id);
         this.deleteButton[id] = await document.querySelector("#" + id +" #del");
         this.deleteButton[id].addEventListener('click',this.deleteButtonHandler.bind(this));
         this.savePageToLocalStorage();
    }

    async removeAppFromPage(id){

        await this.listApp[id].removeAppFromHTML(); 
        await delete this.listApp[id] ;
        await this.savePageToLocalStorage();
    }

    getFreeID(){

        //NO CHECK FOR TO MENY APP
        let id;
        do 
            id = "app" + Math.floor(Math.random() * 100);
        while(this.listApp.hasOwnProperty(id));
        return id;
    }

    deleteButtonHandler(e){

        delete localStorage[e.target.offsetParent.id]
        this.removeAppFromPage(e.target.offsetParent.id);
    }


    savePageToLocalStorage(){

        localStorage["pages"] = JSON.stringify(this);
    }

    async loadFromLocalStorage(){

        let new_page = await JSON.parse(localStorage.getItem("pages"));
        for(let i in new_page.listApp){
            await this.addApp(i);
            await this.listApp[i].loadAppFromLocalStorage();
        }
    }
}


module.exports.Page = Page;