

templateApp = ` <div class="search-container">
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

module.exports.templateApp = templateApp