import React, { useState, useEffect } from 'react';
import { fetchWeatherData, getLocation } from '../../API/WeatherAPI/index';
import { Clock } from './Clock';
import { Cocktail } from './Cocktail';
import { useSelector, Provider } from 'react-redux';
import { RootState, store } from '../../app/store';

import { SearchAddress } from './SearchAddress';

import styles from './Weather.module.scss';

type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};

function GetWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const { lat, lon } = useSelector((state: RootState) => state.coordinates);

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherData(latitude, longitude);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCurrentWeather();
  }, []);

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        if (lat) {
          const weatherData = await fetchWeatherData(Number(lat), Number(lon));
          setWeather(weatherData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCurrentWeather();
  }, [lat, lon]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  const { name, main, weather: weatherDetails } = weather;
  const temperature = `${main.temp.toFixed(0)} °C`;
  const { description, icon } = weatherDetails[0];
  const mainWeather = weatherDetails[0].main;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  console.log(mainWeather);

  return (
    <Provider store={store}>
      <div className={styles.weather}>
        <div className={styles.title}>
          <h1>날씨가 {description}일 때 어울리는 칵테일 </h1>
          <img className={styles.icon} src={iconUrl} alt="Weather Icon"></img>
        </div>

        <section className={styles.section}>
          <div>
            <img src={iconUrl} alt="Weather Icon" />
            <p>현재 시각 : {<Clock></Clock>}</p>
            <p>현재 지역 : {name}</p>
            <p>온도 : {temperature}</p>
            <p>날씨 : {description}</p>
          </div>

          <div>
            <SearchAddress></SearchAddress>
          </div>
        </section>

        <div className={styles.img}>
          <Cocktail mainWeather={mainWeather}></Cocktail>
        </div>
      </div>
    </Provider>
  );
}

export { GetWeather };
