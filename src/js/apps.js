
const axios = require('axios');
const ApiKey = require('./config').ApiKey;
const templateApp = require('./template').templateApp;

class App {

    constructor(id) {
        this.id = id;
        this.city;
        this.dom = document.getElementById(id) || App.addNewDivInHTML(id);

        this.searchbutton = document.querySelector("#" + id +" button");
        this.searchbutton.addEventListener('click',this.setCityFromInput.bind(this));
        this.refreshbutton = document.querySelector("#" + id +" #refresh");
        this.refreshbutton.addEventListener('click',this.getWeatherData.bind(this));
    }
    
    async setCityFromInput(e){

        e.preventDefault()
        this.city = await document.querySelector("#" + this.id+ " input").value;
        await this.getCityKey();
        await this.getWeatherData();
        
    }
    
    async getCityKey(){

        const citySearchUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ApiKey}&q=${this.city}&language=pl`;

        let responseData = await axios.get(citySearchUrl)
         .then(function (response) {
             // handle success
            return response.data[0]
        })
        .catch(function (error) {
            // handle error
            return undefined;
        });

        if (responseData != undefined){
            await console.log(responseData);
            this.keyCity = await responseData.Key;
            this.nameCity = responseData.LocalizedName;
            this.country = responseData.Country.LocalizedName
        }
    }
    
    async getWeatherData(){

        const currentConditionUrl = `http://dataservice.accuweather.com/currentconditions/v1/${this.keyCity}?apikey=${ApiKey}&language=pl&details=true`; 
        
        if (this.keyCity != undefined){
            this.weatherData = await axios.get(currentConditionUrl)
            .then(function (response) {
                // handle success
                return response.data[0]
            })
            .catch(function (error) {
                // handle error
                return undefined;
            });
            await this.updateHTML();
            await this.saveAppToLocalStorage();

        }else{

            this.showErrorInHTML();
        }
    }

    removeAppFromHTML(){

        var element = document.getElementById(this.id);
        element.parentNode.removeChild(element);
    }

    saveAppToLocalStorage(){
        localStorage[this.id] = JSON.stringify(this);
        }
        
    loadAppFromLocalStorage(){
            
        if (localStorage[this.id] != undefined){
            app = JSON.parse(localStorage[this.id]);
            this.city = app.city;
            this.keyCity = app.keyCity;
            this.nameCity = app.nameCity;
            this.country = app.country;
            
            this.getWeatherData();
        }
    }

    updateHTML(){ 
        let id = "#" + this.id + " ";
        let data = this.weatherData 
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
    
    showErrorInHTML(){
        id = "#" + this.id + " ";
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

    static addNewDivInHTML(id)
    {
        let newDiv = document.createElement("div");
        newDiv.id = id;
        newDiv.className = "app";
        newDiv.innerHTML = templateApp;
    
        document.querySelector(".container").insertBefore(newDiv,document.querySelector("#add"));
        
        return document.getElementById(id);
    }
    
}

module.exports.App = App;
