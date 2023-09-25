import { useEffect } from 'react';
import styles from './CocktailMatch.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData, getLocation } from '../../API/WeatherAPI/index';
import { useDispatch, useSelector } from 'react-redux';
import { setWeatherInfo } from '../../store/weatherSlice';
import { RootState } from '../../store/store';
import GetCocktail from './GetCocktail';

function GetWeather() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const weatherInfo = useSelector(
    (state: RootState) => state.weather.weatherInfo
  );

  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherData(latitude, longitude);
        dispatch(setWeatherInfo(weatherData));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCurrentWeather();
  }, [dispatch]);

  // 렌더링전 로딩 문구
  if (!weatherInfo) {
    return (
      <div className={styles.loadingPg}>날씨에 어울리는 칵테일 제조중...🍸</div>
    );
  }

  // getCocktail에 내려 줄 변수 만들기
  const { name, main, weather: weatherDetails } = weatherInfo;
  const { description, icon } = weatherDetails[0];
  const temperature = `${main.temp.toFixed(0)} °C`;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
  const weatherName = weatherDetails[0].main;

  const handleLocationBtnClick = () => {
    navigate(`/weather`);
  };

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
      <GetCocktail weatherName={weatherName}></GetCocktail>
    </div>
  );
}

export default GetWeather;
