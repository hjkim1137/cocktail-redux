import { useEffect, useState } from 'react';
import WGobject from './WGobject';
import styles from './CocktailMatch.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData, getLocation } from '../../API/WeatherAPI/index';

function GetWeather() {
// 주소별 조회버튼
const navigate = useNavigate();
const handleLocationBtnClick = () => {
navigate(`/weather`);
};

// interface 정의(API로 받는 데이터 형식과 동일)
// name: 현재 지역명, main: 온도 정보를 포함한 객체
// weather: 날씨 종류 포함한 배열, desc: 날씨(국문), weather: weatherDetails 이름으로 바꿔 가져오기,
interface WeatherType {
name: string;
main: {
temp: number;
};
weather: {
main: any;
description: string;
icon: string;
}[];
}

// weather api 통신 및 setWeatherData 처리
useEffect(() => {
const getCurrentWeather = async () => {
try {
const position = await getLocation();
const { latitude, longitude } = position.coords;

        const weatherData = await fetchWeatherData(latitude, longitude);
        setWeatherInfo(weatherData);
        console.log('weatherdata', weatherData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCurrentWeather();

}, []);

// [상태관리1]: WeatherData (null값 처리 포함)
const [weatherInfo, setWeatherInfo] = useState<WeatherType | null>(null);
console.log('weatherData', weatherInfo);

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
<GetCocktail weatherName={weatherName} />;
</div>
);
}

interface GetCocktailProps {
weatherName: string;
}

function GetCocktail({ weatherName }: GetCocktailProps) {
// Cocktail 인터페이스 정의
interface Cocktail {
idDrink: string; // 칵테일 id
strDrink: string; // 칵테일 이름
strDrinkThumb: string; // 칵테일 이미지
}
console.log('weatherName', weatherName); // type: string

const [cocktailInfo, setCocktailInfo] = useState<Cocktail | null>(null);

useEffect(() => {
const fetchCocktails = async () => {
const glassType: any = WGobject[weatherName]; // 날씨와 매칭되는 글래스 잔(기준이 됨)
console.log('glassType', glassType);

      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassType}`
        );
        const data = await response.json(); // json -> js 객체로 변환
        const cocktailArr = data.drinks; // 이제 쓸 수 있는 데이터 됨 [{...}, {...}, {...}]
        const randomIndex = Math.floor(Math.random() * cocktailArr.length);
        const selectedCocktail = cocktailArr[randomIndex]; // 랜덤으로 선택된 칵테일 정보

        // [상태관리2]: cocktailInfo 저장
        setCocktailInfo({
          idDrink: selectedCocktail.idDrink,
          strDrink: selectedCocktail.strDrink,
          strDrinkThumb: selectedCocktail.strDrinkThumb,
        });
      } catch (err) {
        console.error('error:', err);
      }
    };
    fetchCocktails();

}, [weatherName]); //날씨가 바뀔 때마다 재렌더링

if (!cocktailInfo) {
return <div className={styles.loading}>칵테일 제조중...</div>;
}

// MakeBtns에 넘길 매개변수 만들기
const cocktailId = cocktailInfo.idDrink;
const cocktailName = cocktailInfo.strDrink;

return (
<div>
<h4 className={styles.cocktailName}>{cocktailInfo.strDrink}</h4>
<img
        src={cocktailInfo.strDrinkThumb}
        alt={cocktailInfo.strDrink}
        className={styles.drinkImg}
      />
<MakeBtns cocktailId={cocktailId} cocktailName={cocktailName} />
</div>
);
}

function MakeBtns(cocktailId: any, cocktailName: any) {
// 구글 검색 기능
const navigate = useNavigate();
const handleGoogleSearch = () => {
if (cocktailName) {
const searchWord = cocktailName;
const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchWord
      )}`;
window.open(searchUrl, '\_blank');
}
};

// 칵테일 상세(제조법) 알아보기
const handleButtonClickForDetail = () => {
if (cocktailId) {
navigate(`/detail/${cocktailId}`);
} else {
console.error('칵테일 상세 페이지로 이동 중 에러 발생');
}
};

// 다시 추천 받기
const [reloadKey, setReloadKey] = useState(0);
const handleButtonClickForReload = () => {
setReloadKey((prevKey) => prevKey + 1);
};

return (
<div className={styles.buttonBox}>
<button onClick={handleGoogleSearch} className={styles.googleBtn}>
칵테일 정보 Google 검색
</button>
<button onClick={handleButtonClickForDetail} className={styles.learnBtn}>
제조법 알아보기
</button>
<button onClick={handleButtonClickForReload} className={styles.againBtn}>
다시 추천받기
</button>
</div>
);
}

export { GetWeather, GetCocktail, MakeBtns };
