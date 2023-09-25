import MakeBtns from './MakeBtns';
import { useEffect, useState } from 'react';
import WGobject from './WGobject';
import styles from './CocktailMatch.module.scss';

interface GetCocktailProps {
  weatherName: string;
}

function GetCocktail({ weatherName }: GetCocktailProps) {
  interface Cocktail {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }

  const [cocktailInfo, setCocktailInfo] = useState<Cocktail | null>(null);
  // 칵테일 재 추천 기능을 위한 로딩 상태 도입
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCocktails = async () => {
    setLoading(true); // 로딩 시작
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

  useEffect(() => {
    fetchCocktails();
  }, [weatherName]);

  return (
    <>
      {loading ? (
        <div className={styles.loading}>새로운 칵테일 추천 중...🍸</div>
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
        <div className={styles.loading}>칵테일 제조중...🍸</div>
      )}
    </>
  );
}

export default GetCocktail;
