app_data = ` <div class="search-container">
<form action="/action_page.php">
    <input type="text" placeholder="Search.." name="search">
    <button type="submit"><i class="fa fa-search"></i></button>
</form>
</div>


<div class="weather">

<div class="weather_current">
<span id="icon"></span>
<span id="temp"></span>
<span id="realtemp"></span>
<span id="location_name"></span>
<span id="weatherText" ></span>
</div>
<div class="weather_next">
<span id="pressure" ></span>
<span id="wind" ></span>
<span id="precipitation"></i></span>
</div>
</div>
<div class="nav">
<button id="button1">Teraz</button>
<button id="button2">Prognoza</button>
<button id="button3">Zmień</button>
</div>
<div class="del">
<button id="del">X</button>
</div>`





function updateApp(id, cityName){
    id = "#" + id + " ";
    temp = document.querySelector(id +"#temp");
    weatherText = document.querySelector(id +"#weatherText");
    pressure = document.querySelector(id +"#pressure");
    wind = document.querySelector(id +"#wind");
    icon = document.querySelector(id +"#icon")
    location_name = document.querySelector(id +"#location_name")
    precipitation = document.querySelector(id +"#precipitation")
    realtemp = document.querySelector(id +"#realtemp")
    
    
    location_name.innerText = cityName + ", Polska";
    temp.innerText = '28.2' + "°C";
    weatherText.innerText = "Jest " + 'Pochmurnie';

    realtemp.innerText = "12°C"

    pressure.innerHTML = `<i class="wi wi-barometer"></i>`;
    pressure.innerHTML += '1000';

    let deg = 180;

    wind.innerHTML = `<i class="wi wi-wind-direction"style="transform: rotate(${deg}deg);"></i>`
    wind.innerHTML += '12' + "km/h";

    precipitation.innerHTML = `<i class="wi wi-umbrella" ></i>`;
    precipitation.innerHTML += "0mm";

    
    // let newIconUrl = `./assets/icon/${data.WeatherIcon}-s.png`
    let nr = 2;
    nr = nr>10 ? `${nr}` : `0${nr}`
    icon.innerHTML = `<i class="wi icon-accu${nr} icon"></i>`


}


async function updatePage(){
    
    await page.addPage("app1", "Szprotawa")
    await page.addPage("app2", "Warszawa")
    await page.addPage("app3", "Kraków")
    await page.addPage("app4")

    let button = await document.querySelector("#add button")

    await button.addEventListener('click',add);

    return page
    
}

function add(e){
    page.addPage(page.newID())
}

class Page {
    constructor() {
        this.listApp = {};
        this.button = {};
    }

    async addPage(id, city){
         this.listApp[id] = await new App(id, city);
         this.button[id] = await document.querySelector("#" + id +" #del");
         this.button[id].addEventListener('click',remove);
         await this.listApp[id].updateApp();
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
}

class App {
    constructor(id, city) {
        this.id = id;
        console.log(id)
        console.log(city)
        this.city = city || "Wrocław";
        this.dom = document.getElementById(id) || App.addElement(id)
    }

    static addElement(id)
    {
      let newDiv = document.createElement("div");
      newDiv.id = id;
      newDiv.className = "app"
      newDiv.innerHTML = app_data;
    
      document.querySelector(".container").insertBefore(newDiv,document.querySelector("#add"));
      
      return document.getElementById(id)
    }

    setCity(city){
        this.city = city;
    }

    updateApp(){
        updateApp(this.id, this.city);
    }

    removeApp(){
        var element = document.getElementById(this.id);
        element.parentNode.removeChild(element);
    }
    
}
 var page = new Page()
 updatePage()



function remove(e){
    page.removePage(e.target.offsetParent.id)
}






