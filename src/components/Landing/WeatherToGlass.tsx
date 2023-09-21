// 날씨와 매칭된 글래스옵션 api를 호출
// 호출된 API에서 반환된 칵테일 중에서 랜덤으로 하나를 선택하여 추천하는 기능을 추가

import { useEffect, useState } from 'react';
import styles from './WeatherToGlass.module.scss';

const weatherToGlass = {
  Thunderstorm: 'Coffee_mug',
  Tornado: 'Coffee_mug',
  Rain: 'Coffee_mug',
  Squall: 'Coffee_mug',
  Drizzle: 'Collins_glass',
  Mist: 'Collins_glass',
  Smoke: 'Collins_glass',
  Fog: 'Collins_glass',
  Haze: 'Collins_glass',
  Snow: 'Irish_coffee_cup',
  Clear: 'Cocktail_glass',
  Clouds: 'Highball_glass',
  Dust: 'Highball_glass',
  Sand: 'Highball_glass',
  Ash: 'Highball_glass',
};

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface Props {
  weather: keyof typeof weatherToGlass; // 타입이 string 이면서, 객체의 키: Thunderstorm, Tornado, Rain..
  onCocktailSelected?: (id: string) => void; // 반환값 없는 함수(void)
}

// React.FC 사용 지양하는 것이 좋음
// 리팩토링 전 - const CocktailList: React.FC<Props> = ({ weather, onCocktailSelected }) => {
// 리팩토링 후 - const CocktailList= ({ weather, onCocktailSelected }: Props) => {

// 칵테일 리스트 함수 시작
const CocktailList = ({ weather, onCocktailSelected }: Props) => {
  // 질문: 아래 코드 해석
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  // 해당 칵테일에 관한 구글 검색 페이지로 이동하기
  const handleGoogleSearch = () => {
    if (cocktail && cocktail.strDrink) {
      const searchWord = cocktail.strDrink;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchWord
      )}`;
      window.open(searchUrl, '_blank');
    }
  };

  useEffect(() => {
    const fetchCocktails = async () => {
      // 질문: 왜 weather 바로 사용은 안되고 새롭게 glassOption 변수 생성해 저장해야 하는지?
      const glassOption = weatherToGlass[weather]; // Thunderstorm, Tornado, Rain..

      // if (!glassOption) {
      //   throw new Error(`Invalid weather type: ${weather}`);
      // }

      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassOption}`
        );
        // console.log('response', response);
        // Response {type: 'cors', url:'..', redirected: false, status: 200, ok: true, …}

        const data = await response.json(); // 질문: 왜 json() 해줘야 하는지?
        // console.log('data', data); // drinks: Array(100) -> drinks:[{...}, {...}, {...}]

        const cocktailArr = data.drinks; // 이제 쓸 수 있는 데이터 됨 [{...}, {...}, {...}]
        const randomIndex = Math.floor(Math.random() * cocktailArr.length);
        const selectedCocktail = cocktailArr[randomIndex]; // 랜덤으로 선택된 칵테일 정보

        setCocktail({
          idDrink: selectedCocktail.idDrink,
          strDrink: selectedCocktail.strDrink,
          strDrinkThumb: selectedCocktail.strDrinkThumb,
        });

        // 선택된 칵테일의 ID를 상위 컴포넌트에 전달
        // 질문: 왜 타입이 function 인지 체크하는 지?
        if (typeof onCocktailSelected === 'function') {
          onCocktailSelected(selectedCocktail.idDrink);
        }
      } catch (err) {
        console.error('error:', err);
      }
    };
    fetchCocktails();
  }, [weather, onCocktailSelected]);

  // 칵테일 다시 추천 버튼 눌렀을 때 로딩 문구
  if (!cocktail) {
    return <div className={styles.loading}>칵테일 제조중...</div>;
  }

  return (
    <div>
      <h4 className={styles.cocktailName}>{cocktail.strDrink}</h4>
      <button onClick={handleGoogleSearch} className={styles.googleBtn}>
        칵테일 정보 Google 검색
      </button>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className={styles.drinkImg}
      />
    </div>
  );
};

export default CocktailList;
