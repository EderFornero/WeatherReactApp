import { useState } from 'react';
import './App.css';
const API = {
  key: "ed326d0ef42a6e6e4ae5f7192747151e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {


  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        })
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') ?
        ((weather.main.temp > 22) ?
          'app warm'
          : 'app')
        : 'app'}>
      <main>
        <div className='search'>
          <input
            type="text"
            className='search-bar'
            placeholder='Search here'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <>
            <div className="location-div">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>

          </>
        ) : ('')
        }
      </main>
    </div>
  );
}

export default App;
