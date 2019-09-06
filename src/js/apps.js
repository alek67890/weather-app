
const axios = require('axios');
const ApiKey = require('./config').ApiKey


function showError(id){
    id = "#" + id + " ";
    temp = document.querySelector(id +"#temp");
    temp.innerText = "Error with API"

    weatherText = document.querySelector(id +"#weatherText");
    pressure = document.querySelector(id +"#pressure");
    wind = document.querySelector(id +"#wind");
    icon = document.querySelector(id +"#icon")
    location_name = document.querySelector(id +"#location_name")
    precipitation = document.querySelector(id +"#precipitation")
    realtemp = document.querySelector(id +"#realtemp")

    location_name.innerText = "";
    weatherText.innerText = "";
    realtemp.innerText = "";
    pressure.innerHTML = "";
    wind.innerHTML = "";
    precipitation.innerHTML = "";

}

function showWelcome(id){
    id = "#" + id + " ";
    temp = document.querySelector(id +"#temp");
    temp.innerText = "Please input city name"

    weatherText = document.querySelector(id +"#weatherText");
    pressure = document.querySelector(id +"#pressure");
    wind = document.querySelector(id +"#wind");
    icon = document.querySelector(id +"#icon")
    location_name = document.querySelector(id +"#location_name")
    precipitation = document.querySelector(id +"#precipitation")
    realtemp = document.querySelector(id +"#realtemp")

    location_name.innerText = "";
    weatherText.innerText = "";
    realtemp.innerText = "";
    pressure.innerHTML = "";
    wind.innerHTML = "";
    precipitation.innerHTML = "";

}

function getWeather(key){
    const currentConditionUrl = `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${ApiKey}&language=pl&details=true`;
    return axios.get(currentConditionUrl);
}

class App {
    constructor(id) {
        this.id = id;
        this.city;
        this.dom = document.getElementById(id) || App.addElement(id);
        this.searchbutton = document.querySelector("#" + id +" button");
        this.searchbutton.addEventListener('click',this.setCity.bind(this));
        this.refreshbutton = document.querySelector("#" + id +" #refresh");
        this.refreshbutton.addEventListener('click',this.updateData.bind(this));
    }

    static addElement(id)
    {
      let newDiv = document.createElement("div");
      newDiv.id = id;
      newDiv.className = "app";
      newDiv.innerHTML = app_data;
    
      document.querySelector(".container").insertBefore(newDiv,document.querySelector("#add"));
      
      return document.getElementById(id);
    }

    async setCity(e){
        e.preventDefault()
        this.city = await document.querySelector("#" + this.id+ " input").value;
        await this.getkey();
        this.updateData();
        
    }

    async getkey(){
        const citySearchUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ApiKey}&q=${this.city}&language=pl`;
        let data = await axios.get(citySearchUrl)
         .then(function (response) {
            // handle success
            return response.data[0]
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return undefined;
        });
        await console.log(data);
        this.keyCity = await data.Key;
        this.nameCity = data.LocalizedName;
        this.country = data.Country.LocalizedName
    }

    async updateData(){

        
        console.log(this.keyCity);
        if (this.keyCity != undefined){

        
        this.weather = await getWeather(this.keyCity);
        this.weather = this.weather.data[0];
        console.log(this.weather);
        await this.updateApp();
        }
        else{
            showError(this.id);
        }
        this.save();
    }

    removeApp(){
        var element = document.getElementById(this.id);
        element.parentNode.removeChild(element);
    }

    save(){
        localStorage[this.id] = JSON.stringify(this);
        }

    load(){

        if (localStorage[this.id] != undefined){
            app = JSON.parse(localStorage[this.id]);
            this.city = app.city;
            this.keyCity = app.keyCity;
            this.nameCity = app.nameCity;
            this.country = app.country;

            this.updateData();
        }
    }

    updateApp(){//this.id, this.city, this.weather    this.nameCity   this.country 
        let id = "#" + this.id + " ";
        let data = this.weather 
        let temp = document.querySelector(id +"#temp");
        let weatherText = document.querySelector(id +"#weatherText");
        let pressure = document.querySelector(id +"#pressure");
        let wind = document.querySelector(id +"#wind");
        let icon = document.querySelector(id +"#icon")
        let location_name = document.querySelector(id +"#location_name")
        let precipitation = document.querySelector(id +"#precipitation")
        let realtemp = document.querySelector(id +"#realtemp")
        
        
        location_name.innerText = this.nameCity + ", " + this.country ;
        temp.innerText = data.Temperature.Metric.Value + "°C";
        weatherText.innerText = data.WeatherText;
    
        realtemp.innerText = "RealTemp: " + data.RealFeelTemperature.Metric.Value + "°C"
    
        pressure.innerHTML = `<i class="wi wi-barometer"></i>`;
        pressure.innerHTML += data.Pressure.Metric.Value + "<br>hPa";
    
        let deg = data.Wind.Direction.Degrees;
    
        wind.innerHTML = `<i class="wi wi-wind-direction"style="transform: rotate(${deg}deg);"></i>`
        wind.innerHTML += data.Wind.Speed.Metric.Value + "<br>km/h";
    
        precipitation.innerHTML = `<i class="wi wi-umbrella" ></i>`;
        precipitation.innerHTML += data.PrecipitationSummary.Precipitation.Metric.Value + "<br>mm";
    
        
        // let newIconUrl = `./assets/icon/${data.WeatherIcon}-s.png`
        let nr = 2;
        nr = nr>10 ? `${nr}` : `0${nr}`
        icon.innerHTML = `<i class="wi icon-accu${nr} icon"></i>`
    
    
    }
    
}

module.exports.App = App;


app_data = ` <div class="search-container">
<form action="/action_page.php">
    <input type="text" placeholder="Search.." name="search">
    <button type="submit"><i class="fa fa-search"></i></button>
</form>
</div>


<div class="weather">

<div class="weather_current">
<span id="icon"></span>
<span id="temp">Please input city name</span>
<span id="realtemp"></span>
<span id="location_name"></span>
<span id="weatherText" ></span>
</div>
<div class="weather_detail">
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
<button id="refresh"><i class="fa fa-refresh"></i></button>
<button id="del"><i class="fa fa-close"></i></button>
</div>`

