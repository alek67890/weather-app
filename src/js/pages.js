
const apps = require('./apps');


class Page {
    constructor() {
        this.listApp = {};
        this.delbutton = {};
    }

    async addPage(id){
         this.listApp[id] = await new apps.App(id);
         this.delbutton[id] = await document.querySelector("#" + id +" #del");
         this.delbutton[id].addEventListener('click',this.remove.bind(this));

    }

    async removePage(id){
        await this.listApp[id].removeApp(); 
        await delete this.listApp[id] ;
    }

    newID(){
        let id;
        do 
        id = Math.floor(Math.random() * 100)
        while(this.listApp.hasOwnProperty(id)) ;
        return "app" + id;
    }

    remove(e){
        console.log(e.target.offsetParent.id)
        console.log("----------------------")
        console.log(this)
        this.removePage(e.target.offsetParent.id);
    }
}



module.exports.Page = Page;