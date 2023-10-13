import { useEffect } from 'react';
import { fetchCocktail } from '../../../features/cocktailSlice';
import MakeBtns from '../makeBtns/MakeBtns';
import styles from '../home.module.scss';
import { GetCocktailProps } from './getCocktail.interface';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

function GetCocktail({ weatherName }: GetCocktailProps) {
  const { cocktailInfo, status } = useAppSelector((state) => state.cocktail);
  const dispatch = useAppDispatch();

  // action dispatch 하기
  useEffect(() => {
    if (weatherName) {
      dispatch(fetchCocktail(weatherName)); // fetchCocktail은 비동기 작업(for glass기준 랜덤추천 통신)
    }
  }, [dispatch, weatherName]); // dispatch, weatherName 갱신에 따라 재 렌더링

  return (
    <>
      {status === 'loading' ? (
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
            reloadCocktail={() => dispatch(fetchCocktail(weatherName))}
            cocktailId={cocktailInfo.idDrink}
            cocktailName={cocktailInfo.strDrink}
          />
        </>
      ) : (
        <div className={styles.loading}>연결 오류: 칵테일 정보 수신 불가</div>
      )}
    </>
  );
}

export default GetCocktail;
