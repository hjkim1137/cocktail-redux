이전

function GetWeather() {
const navigate = useNavigate();

// interface 정의
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

// [상태관리1]: WeatherData
const [weatherData, setWeatherData] = useState<WeatherType | null>(null);

// WeathefData 없는 경우
if (!weatherData) {
return (

<div className={styles.loadingPg}>날씨에 어울리는 칵테일 제조중...</div>
);
}

// weather api 통신 및 setWeatherData 처리
useEffect(() => {
const getCurrentWeather = async () => {
try {
const position = await getLocation();
const { latitude, longitude } = position.coords;

        const weatherData = await fetchWeatherData(latitude, longitude);
        setWeatherData(weatherData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCurrentWeather();

}, []);

// 저장한 상태 재료 가져와서 쓰기
// name: 현재 지역명, weather를 weatherDetails 이름으로 바꿔 가져오기, desc: 날씨(국문)
const { name, main, weather: weatherDetails } = weatherData;
const temperature = `${main.temp.toFixed(0)} °C`;
const { description, icon } = weatherDetails[0];
const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

// 주소별 조회버튼
const handleLocationBtnClick = () => {
navigate(`/weather`);
};

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
    </div>

);
}

[문제]
https://velog.io/@jazzyfact95/TIL-React-React-Hook-is-called-conditionally.-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0

이후
useeffect를 최상위로 올려주니 문제 해결

[메모]
weatherData 데이터 형식 참고

[문제2]
데이터가 서버 등 오류로 인해 못들어 오는 경우도 있으니까
ts 타입을 null 추가해주기
const [weatherInfo, setWeatherInfo] = useState<WeatherType | null>(null);

[데이터구조]
[Before]
weatherToGlass.tsx

- WGobejct 매칭 파일 import
- cocktailList 컴포넌트
  - 칵테일 구글 상세 검색 기능
  - cocktailMatch로 부터 weatherType prop 받음)
  - WGobejct 에서 글래스 잔 기준 랜덤 칵테일 API 통신
  - 상태관리: cocktailInfo(칵테일 id, 칵테일 이름, 칵테일 이미지)
  - 리턴 값= 칵테일 이름, 구글 버튼, 칵테일 이미지

cocktailMatch

- cocktailMatch 컴포넌트
  - 상태관리: weather(getLocation 내장함수 통해 위도, 경도 구하고 그걸 근거로 API 연동하여 cityName 구하기 + 날씨 종류(한글), 기온, 날씨 아이콘)
    - 상태관리: selectedCocktailId
    - 상세 페이지 가기 버튼
    - 칵테일 다시 추천받기 기능
    - 리턴 값= 현재 위치, 주소별 조회기능, 날씨,기온,날씨 아이콘,00 날씨에어울리는 칵테일, cocktailList 컴포넌트(prop: weatherType, idDrink, key),제조법 알아보기 버튼,다시 추천받기 버튼

[After]
[같은 기능별로 파일 분리하기]

- getWeather 컴포넌트

  - 역할: getLocation 내장함수 통해 fetchWeather API에 필요한 매개변수인 위도, 경도를 구하고, 이를 근거로 현재 지역 날씨를 구하는 기능
  - [상태관리1]: weatherInfo(cityName, 날씨 종류(한글), 기온, 날씨 아이콘)

    - 리턴 값
      - 현재 위치
      - 주소별 조회버튼
      - 날씨/날씨상세/기온
      - 날씨 아이콘
      - 00 날씨에 어울리는 칵테일 문구

- (신규) getCocktail 컴포넌트

  - 역할: getWeather 컴포넌트에서 받은 날씨 정보를 바탕으로 글래스 종류와 매칭하는 역할
  - Prop: getWeather 컴포넌트에서 [날씨 이름] 전달 받음
  - WGobejct의 날씨이름-글래스 잔 기준으로 대조하여 글래스잔에 따른 랜덤 칵테일 API 통신 진행
  - [상태관리2] : cocktailInfo(칵테일 id, 칵테일 이름, 칵테일 이미지) <- 글래스잔에 따른 단일 랜덤 칵테일
  - 리턴 값(괄호는 숨겨진 값)= (칵테일 id), 칵테일 이름, 칵테일 이미지

- (신규) makeBtns 컴포넌트
  - 역할: 버튼(구글버튼, 제조법 버튼, 다시 추천받기 버튼)을 렌더링 하고 필요한 쿼리를 전달하는 역할
  - prop: getCocktail 컴포넌트에서 [칵테일 이름](for 구글버튼), [칵테일 id](for 제조법 버튼)
  - 구성 기능: 칵테일 구글 상세 검색 기능, 제조법 알아보기 버튼
  - 리턴 값= 구글 버튼, 제조법 버튼, 다시 추천받기 버튼

[문제3]
error: SyntaxError: Unexpected end of JSON input
at fetchCocktails (final.tsx:118:1)
fetchCocktails @ final.tsx:130

Unexpected end of JSON input 오류는 일반적으로 JSON.parse() 메서드가 빈 문자열을 파싱하려 할 때 발생합니다. 이 오류가 fetchCocktails 함수에서 발생했다는 것은, 해당 함수에서 서버로부터 JSON 응답을 기대하고 있지만, 빈 문자열이나 예상치 못한 응답이 올 때 발생할 수 있습니다.

원인1. console.log('glassType', glassType); // undefined 로 찍힘 glassType을 식별하지 못하고 있어서
fetchCocktails 할때 넣을 값이 없어서 문제가 발생하는 것

원인2. props로 넘길 떄,
function GetCocktail(weatherName: any) {

console.log('weatherName', weatherName); //type을 string으로 받아야 하는데 object로 받아서 문제 생김
}

해결방법
prop으로 받아올 때 interface 정의해서 string으로 받아왔다.
interface GetCocktailProps {
weatherName: string;
}

[문제4] createSlice에서 비동기 로직을 처리하려면, 일반적으로 createAsyncThunk를 사용하여 비동기 액션을 만들고, 이를 extraReducers를 통해 처리합니다. 그럼 useEffect 내에서 호출한 비동기 함수 로직을 createAsyncThunk로 바꿔 작성해보겠습니다.

먼저 createAsyncThunk를 사용하여 비동기 액션을 생성합니다. 이 함수는 첫 번째 매개변수로 액션 타입을, 두 번째 매개변수로 페이로드 생성 함수를 받습니다.

[작성법]
