import MakeBtns from '../makeBtns/MakeBtns';
import { useEffect, useState } from 'react';
import WGobject from './WGobject';
import styles from '../landing.module.scss';
import { GetCocktailProps, Cocktail } from './getCocktail.interface';

function GetCocktail({ weatherName }: GetCocktailProps) {
  const [cocktailInfo, setCocktailInfo] = useState<Cocktail | null>(null);
  // 칵테일 재 추천 기능을 위한 로딩 상태 도입
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCocktails = async () => {
    setLoading(true); // 칵테일 정보 로딩 시작
    const glassType: any = WGobject[weatherName];
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassType}`
      );

      const data = await response.json();

      const cocktailArr = data.drinks;
      const randomIndex = Math.floor(Math.random() * cocktailArr.length);
      const selectedCocktail = cocktailArr[randomIndex];
      setCocktailInfo({
        idDrink: selectedCocktail.idDrink,
        strDrink: selectedCocktail.strDrink,
        strDrinkThumb: selectedCocktail.strDrinkThumb,
      });
    } catch (err) {
      console.error('error:', err);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 칵테일 다시 추천받기 기능
  const reloadCocktail = () => {
    fetchCocktails();
  };

  // 날씨에(의존성) 따라서 칵테일 정보가 달라짐
  // useEffect 바깥에서 fetchCocktails 호출 할 수 없기 때문에 따로 코드를 빼주었음
  useEffect(() => {
    fetchCocktails();
  }, [weatherName]);

  return (
    <>
      {loading ? (
        <div className={styles.loading}>칵테일 추천 중...🍸</div>
      ) : cocktailInfo ? (
        <>
          <h4 className={styles.cocktailName}>{cocktailInfo.strDrink}</h4>
          <img
            src={cocktailInfo.strDrinkThumb}
            alt={cocktailInfo.strDrink}
            className={styles.drinkImg}
          />
          <MakeBtns
            reloadCocktail={reloadCocktail}
            cocktailId={cocktailInfo.idDrink}
            cocktailName={cocktailInfo.strDrink}
          />
        </>
      ) : (
        <div className={styles.loading}>칵테일 정보 수신 불가</div>
      )}
    </>
  );
}

export default GetCocktail;
