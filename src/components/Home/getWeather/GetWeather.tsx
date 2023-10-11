import { useEffect } from 'react';
import styles from '../home.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData, getLocation } from '../../../API/WeatherAPI/index';
import { useDispatch } from 'react-redux';
import { setWeatherInfo } from '../../../features/weatherSlice';
import GetCocktail from '../getCocktail/GetCocktail';
import { useAppSelector } from '../../../app/hooks';

function GetWeather() {
  const navigate = useNavigate();
  const handleLocationBtnClick = () => {
    navigate(`/weather`);
  };

  const dispatch = useDispatch();

  // action dispatch 하기
  useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherData(latitude, longitude);
        dispatch(setWeatherInfo(weatherData)); // setWeatherInfo(액션명), weatherData(페이로드)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCurrentWeather();
  }, [dispatch]);

  // state에 저장된 값 weatherInfo에 불러오기
  const weatherInfo = useAppSelector((state) => state.weather.weatherInfo);

  // 렌더링전 로딩 문구(null 체크)
  if (!weatherInfo) {
    return (
      <div className={styles.loadingPg}>날씨에 어울리는 칵테일 제조중...🍸</div>
    );
  }

  // 화면에 표시하는 UI
  const { name, main, weather: weatherDetails } = weatherInfo;
  const { description, icon } = weatherDetails[0]; // weather 디테일을(이름 헷갈리니까 구분위해)weatherDetails에 할당
  const temperature = `${main.temp.toFixed(0)} °C`;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  // getCocktail에 내려 줄 변수 만들기
  const weatherName = weatherDetails[0].main; //날씨명(영문)

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
      <h3 className={styles.h3}>[{description}] 날씨에 어울리는 칵테일 🍸</h3>
      <GetCocktail weatherName={weatherName}></GetCocktail>
    </div>
  );
}

export default GetWeather;
