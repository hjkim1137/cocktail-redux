// // 날씨와 매칭된 글래스옵션 api를 호출
// // 호출된 API에서 반환된 칵테일 중에서 랜덤으로 하나를 선택하여 추천하는 기능을 추가

// import { useEffect, useState } from 'react';
// import styles from './WeatherToGlass.module.scss';
// import WGobject from './WGobject';

// interface Cocktail {
//   idDrink: string; // 칵테일 id
//   strDrink: string; // 칵테일 이름
//   strDrinkThumb: string; // 칵테일 이미지
// }

// // 칵테일 상세 페이지와 연동을 위해 넘기는 값들(날씨, 선택된 칵테일 정보(콜백함수))
// interface Props {
//   weatherType: keyof typeof WGobject; // 타입이 string 이면서, 객체의 키: Thunderstorm, Tornado, Rain..
//   // onCocktailSelected: (id: string) => void; // 반환값 없는 함수타입(인자로 string인 id)
// }

// // React.FC 사용 지양하는 것이 좋음
// // 리팩토링 전 - const CocktailList: React.FC<Props> = ({ weather, onCocktailSelected }) => {
// // 리팩토링 후 - const CocktailList= ({ weather, onCocktailSelected }: Props) => {

// // 칵테일 리스트 함수 시작
// // cocktailMatch에서 weatherType={weatherName}과
// // onCocktailSelected={setSelectedCocktailId} 정보 받아옴
// function CocktailList({ weatherType }: Props) {
//   // 랜덤 칵테일 상태 저장(초기값: null)
//   const [cocktailInfo, setCocktailInfo] = useState<Cocktail | null>(null);

//   // 해당 칵테일에 관한 구글 검색 페이지로 이동하기
//   const handleGoogleSearch = () => {
//     if (cocktailInfo) {
//       const searchWord = cocktailInfo.strDrink;
//       const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
//         searchWord
//       )}`;
//       window.open(searchUrl, '_blank');
//     }
//   };

//   // 칵테일 잔을 기준으로 한 랜덤 칵테일 정보 불러오기
//   useEffect(() => {
//     const fetchCocktails = async () => {
//       const glassType = WGobject[weatherType]; // 날씨와 매칭되는 글래스 잔(기준이 됨)
//       console.log('weather', weatherType);

//       // glass 잔 기준 전체 칵테일 목록 통신 -> 랜덤으로 한 개 추출
//       try {
//         const response = await fetch(
//           `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassType}`
//         );
//         // console.log('response', response);
//         // Response {type: 'cors', url:'..', redirected: false, status: 200, ok: true, …}

//         const data = await response.json(); // json -> js 객체로 변환
//         // console.log('data', data); // drinks: Array(100) -> drinks:[{...}, {...}, {...}]

//         const cocktailArr = data.drinks; // 이제 쓸 수 있는 데이터 됨 [{...}, {...}, {...}]
//         const randomIndex = Math.floor(Math.random() * cocktailArr.length);
//         const selectedCocktail = cocktailArr[randomIndex]; // 랜덤으로 선택된 칵테일 정보

//         setCocktailInfo({
//           idDrink: selectedCocktail.idDrink,
//           strDrink: selectedCocktail.strDrink,
//           strDrinkThumb: selectedCocktail.strDrinkThumb,
//         });

//         // 칵테일 상세페이지 탐색을 위해 칵테일ID를 상위 컴포넌트에 전달
//       } catch (err) {
//         console.error('error:', err);
//       }
//     };
//     fetchCocktails();
//   }, [weatherType, idDrink]);

//   // 칵테일 다시 추천 버튼 눌렀을 때 로딩 문구
//   if (!cocktailInfo) {
//     return <div className={styles.loading}>칵테일 제조중...</div>;
//   }

//   return (
//     // 칵테일 이름, google 버튼, 칵테일 이미지를 return
//     <div>
//       <h4 className={styles.cocktailName}>{cocktailInfo.strDrink}</h4>
//       <button onClick={handleGoogleSearch} className={styles.googleBtn}>
//         칵테일 정보 Google 검색
//       </button>
//       <img
//         src={cocktailInfo.strDrinkThumb}
//         alt={cocktailInfo.strDrink}
//         className={styles.drinkImg}
//       />
//     </div>
//   );
// }

// export default CocktailList;
