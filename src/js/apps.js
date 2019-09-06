let ApiKey;
// ApiKey = 'MGvG0TzQVeBUgVYcA19kvGzGFroIG5bE'
// ApiKey = 'Qp6zt8Bwf5C5lSqdGCvD391l6GFK6y86'
// ApiKey = 'ZGEkMBJgYT8Fw5Qwqu3HEAWQDVWIy7X4'
// ApiKey = 'Rib2PskNkkA8UXpG2ept9F9AqPuQJFCk'
ApiKey = 'NtUz5TWNyqhAdjIClkFboMYd1o2WG4LP'
const axios = require('axios');

function updateApp(id, cityName, data){
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
    temp.innerText = data.Temperature.Metric.Value + "°C";
    weatherText.innerText = data.WeatherText;

    realtemp.innerText = "RealTemp: " + data.RealFeelTemperature.Metric.Value + "°C"

    pressure.innerHTML = `<i class="wi wi-barometer"></i>`;
    pressure.innerHTML += data.Pressure.Metric.Value + "hPa";

    let deg = data.Wind.Direction.Degrees;

    wind.innerHTML = `<i class="wi wi-wind-direction"style="transform: rotate(${deg}deg);"></i>`
    wind.innerHTML += data.Wind.Speed.Metric.Value + "km/h";

    precipitation.innerHTML = `<i class="wi wi-umbrella" ></i>`;
    precipitation.innerHTML += data.PrecipitationSummary.Precipitation.Metric.Value;

    
    // let newIconUrl = `./assets/icon/${data.WeatherIcon}-s.png`
    let nr = 2;
    nr = nr>10 ? `${nr}` : `0${nr}`
    icon.innerHTML = `<i class="wi icon-accu${nr} icon"></i>`


}
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

    async setCity(e){
        e.preventDefault()
        this.city = await document.querySelector("#" + this.id+ " input").value;
        await this.getkey();
        this.updateApp()
        
    }

    async getkey(){
        const citySearchUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ApiKey}&q=${this.city}&language=pl`;
        this.keyCity = await axios.get(citySearchUrl)
         .then(function (response) {
            // handle success
            return response.data[0].Key
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return undefined;
        });

    }

    async updateApp(){
        
        console.log(this.keyCity)
        if (this.keyCity != undefined){

        
        this.weather = await getWeather(this.keyCity);
        this.weather = this.weather.data[0];
        console.log(this.weather);
        await updateApp(this.id, this.city, this.weather);
        }
        else{
            showError(this.id)
        }
    }

    removeApp(){
        var element = document.getElementById(this.id);
        element.parentNode.removeChild(element);
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

