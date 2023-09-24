import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, getLocation } from '../../API/WeatherAPI/index';
import styles from './CocktailMatch.module.scss';
import GetCocktail from './GetCocktail';
import { setWeatherInfo } from '../../store/weatherSlice';

const GetWeather: React.FC = () => {
  const dispatch = useDispatch();

  const weatherInfo = useSelector((state) => state.weather); // weatherInfo 상태 선택

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;

        const weatherData = await fetchWeatherData(latitude, longitude);
        dispatch(setWeatherInfo(weatherData)); // 액션 디스패치
        console.log('weatherdata', weatherData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCurrentWeather();
  }, [dispatch]);

  // WeatherData 없는 경우
  if (!weatherInfo) {
    return (
      <div className={styles.loadingPg}>날씨에 어울리는 칵테일 제조중...</div>
    );
  }

  // 저장한 상태 재료 가져와서 쓰기
  const { name, main, weather: weatherDetails } = weatherInfo;
  const { description, icon } = weatherDetails[0];
  const temperature = `${main.temp.toFixed(0)} °C`;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

  // GetCocktail에 넘길 매개변수 만들기
  const weatherName = weatherDetails[0].main;

  // getWeather 컴포넌트 리턴 값
  return (
    <div>
      <h3 className={styles.h3}>현재 위치한 곳의 날씨</h3>
      <h3 className={styles.h3}>{name}</h3>
      <p className={styles.p}>
        날씨 : {description} | {temperature}{' '}
      </p>
      <div className={styles.weatherIcons}>
        <img
          src={iconUrl}
          alt="Weather Icon"
          className={styles.weatherIcon}
        ></img>
        <img
          src={iconUrl}
          alt="Weather Icon"
          className={styles.weatherIcon}
        ></img>
        <img
          src={iconUrl}
          alt="Weather Icon"
          className={styles.weatherIcon}
        ></img>
      </div>
      <h3 className={styles.h3}>[{description}] 날씨에 어울리는 칵테일</h3>
      <GetCocktail weatherName={weatherName} />;
    </div>
  );
};
export default GetWeather;
