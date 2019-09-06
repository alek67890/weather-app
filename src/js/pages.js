
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
         this.save();

    }

    async removePage(id){
        await this.listApp[id].removeApp(); 
        await delete this.listApp[id] ;
        await this.save();
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


    save(){
        
    localStorage["pages"] = JSON.stringify(this);

    }

    async load(){

        page = await JSON.parse(localStorage.getItem("pages"));
        for(let i in page.listApp){
            await this.addPage(i);
            await this.listApp[i].load();
        }

    }
}



module.exports.Page = Page;