import React, { useState, useEffect } from 'react';
import CocktailList from './WeatherToGlass';
import styles from './CocktailMatch.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData, getLocation } from '../../API/WeatherAPI/index';

function CocktailMatch() {
  const navigate = useNavigate();

  // 추천받은 칵테일 상세 페이지로 넘어가기
  const [selectedCocktailId, setSelectedCocktailId] = useState<string | null>(
    null
  );
  console.log('랜덤 칵테일 id:', selectedCocktailId);

  const handleButtonClickForDetail = () => {
    if (selectedCocktailId) {
      navigate(`/detail/${selectedCocktailId}`);
    } else {
      console.warn('칵테일 상세 페이지로 이동 중 에러 발생');
    }
  };

  // weather 페이지로 넘어가기
  const handleLocationBtnClick = () => {
    navigate(`/weather`);
  };

  // 칵테일 다시 추천받기 기능
  const [reloadKey, setReloadKey] = useState(0);
  const handleButtonClickForReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  // weather 데이터 불러오기
  type WeatherData = {
    name: string;
    main: {
      temp: number;
    };
    weather: {
      main: any;
      description: string;
      icon: string;
    }[];
  };

  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;

        const weatherData = await fetchWeatherData(latitude, longitude);
        setWeather(weatherData as WeatherData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCurrentWeather();
  }, []);

  if (!weather) {
    return (
      <div className={styles.loadingPg}>날씨에 어울리는 칵테일 제조중...</div>
    );
  }

  const { name, main, weather: weatherDetails } = weather;
  const weatherName = weatherDetails[0].main;
  const temperature = `${main.temp.toFixed(0)} °C`;
  const { description, icon } = weatherDetails[0];
  const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div>
      <h3 className={styles.h3}>현재 위치한 곳의 날씨</h3>
      <h3 className={styles.h3}>{name}</h3>
      <button onClick={handleLocationBtnClick} className={styles.locationBtn}>
        주소별 칵테일 조회하러가기
      </button>
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

      <CocktailList
        weather={weatherName}
        key={reloadKey}
        onCocktailSelected={setSelectedCocktailId}
      />

      <div className={styles.buttonBox}>
        <button
          onClick={handleButtonClickForDetail}
          className={styles.learnBtn}
        >
          제조법 알아보기
        </button>
        <button
          onClick={handleButtonClickForReload}
          className={styles.againBtn}
        >
          다시 추천받기
        </button>
      </div>
    </div>
  );
}

export default CocktailMatch;
