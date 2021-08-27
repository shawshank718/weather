import React, { useEffect, useRef, useState } from 'react';
import Primary             from './Components/Primary';
import Secondary           from './Components/Secondary';
import Loader              from './Components/Loader';

import './App.css';

enum AppState {
  loading,
  ready
}

interface Coords {
  lat: number
  long: number
}

function App() {
  const isFirstRender = useRef(true)
  const [coords, setCoords] = useState<Coords>({lat: 0, long: 0})
  const [data, setData] = useState<{ status: AppState, weatherData: any }>({ status: AppState.loading, weatherData: null});

  const getData = async () => {
    const currentWeather = await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        return result;
      });
    const forecastWeather = await fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${coords.lat}&lon=${coords.long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}&exclude=current,minutely,hourly,alerts`)
      .then(res => res.json())
      .then(result => {
        return result;
      });
    const primaryData = {
      city: currentWeather.name,
      country: currentWeather.sys.country,
      description: currentWeather.weather[0].description,
      dt: currentWeather.dt,
      temp: currentWeather.main.temp,
      icon: currentWeather.weather[0].icon
    }
    const secondaryData = forecastWeather.daily
      .filter((item: any, i: number) => i > 0 && i < 5)
      .map((item: any) => {
        return {
          description: item.weather[0].description,
          dt: item.dt,
          temp: item.temp.day,
          icon: item.weather[0].icon
        }
      });
    console.log(forecastWeather);
    setData({
      status: AppState.ready,
      weatherData: {
        current: primaryData,
        forecast: secondaryData
      }
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setCoords({lat: position.coords.latitude, long: position.coords.longitude});
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else {
      getData();
    }
  }, [coords])

  if (data.status === AppState.loading) {
    return (
      <div className="App">
        <Loader/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="PrimaryContainer">
          <Primary data={data.weatherData.current}/>
        </div>
        <div className="SecondaryItemsContainer">
          <Secondary data={data.weatherData.forecast[0]} />
          <Secondary data={data.weatherData.forecast[1]} />
          <Secondary data={data.weatherData.forecast[2]} />
          <Secondary data={data.weatherData.forecast[3]} />
        </div>
      </div>
    );
  }
}

export default App;
