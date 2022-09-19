const app = {
  init: () => {
    document
      .getElementById('btnGet')
      .addEventListener('click', app.fetchWeather);
    document
      .getElementById('btnCurrent')
      .addEventListener('click', app.getLocation);
  },
  fetchWeather: (ev) => {
    //use the values from latitude and longitude to fetch the weather
    let lat = document.getElementById('latitude').value;
    let lon = document.getElementById('longitude').value;
    let key = '193a63bf8fd3a24ae0a5766e2b4c9496';
    let lang = 'en';
    let units = 'metric';
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    //fetch the weather
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.showWeather(data);
      })
      .catch(console.err);
  },
  getLocation: (ev) => {
    let opts = {
      enableHighAccuracy: true,
      timeout: 1000 * 10, //10 seconds
      maximumAge: 1000 * 60 * 5, //5 minutes
    };
    navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
  },
  ftw: (position) => {
    //got position
    document.getElementById('latitude').value =
      position.coords.latitude.toFixed(2);
    document.getElementById('longitude').value =
      position.coords.longitude.toFixed(2);
  },
  wtf: (err) => {
    //geolocation failed
    console.error(err);
  },
  showWeather: (resp) => {
    console.log(resp);
    let row = document.querySelector('.weather.row');
    //clear out the old weather and add the new
    // row.innerHTML = '';
    let dt = new Date(resp.dt * 1000); //timestamp * 1000
    let sr = new Date(resp.sys.sunrise * 1000).toTimeString();
    let ss = new Date(resp.sys.sunset * 1000).toTimeString();
    row.innerHTML = `
      <div class="col">
        <div class="card">
            <h5 class="card-title p-2">${dt.toDateString()}</h5>
              <img
              src="http://openweathermap.org/img/wn/${resp.weather[0].icon}@4x.png"
                  class="card-img-top"
                  alt="${resp.weather[0].description}"
                />
                <div class="card-body">
                  <h3 class="card-title">${resp.weather[0].main}</h3>
                  <p class="card-text">High ${resp.main.temp_max}&deg;C Low ${resp.main.temp_min}&deg;C</p>
                  <p class="card-text">High Feels like ${resp.main.feels_like}&deg;C</p>
                  <p class="card-text">Pressure ${resp.main.pressure}mb</p>
                  <p class="card-text">Humidity ${resp.main.humidity}%</p>
                  <p class="card-text">Wind ${resp.wind.speed}m/s, ${resp.wind.deg}&deg;</p>
                  <p class="card-text">Sunrise ${sr}</p>
                  <p class="card-text">Sunset ${ss}</p>
                </div>
              </div>
            </div>
          </div>`;
  }
};
      

app.init();