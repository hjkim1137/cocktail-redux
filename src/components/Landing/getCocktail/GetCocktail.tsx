import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktail } from '../../../features/cocktailSlice';
import MakeBtns from '../makeBtns/MakeBtns';
import styles from '../landing.module.scss';
import { GetCocktailProps } from './getCocktail.interface';
import { RootState } from '../../../store/store';
import { AppDispatch } from '../../../store/store';

function GetCocktail({ weatherName }: GetCocktailProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { cocktailInfo, status } = useSelector(
    (state: RootState) => state.cocktail
  );

  useEffect(() => {
    if (weatherName) {
      dispatch(fetchCocktail(weatherName));
    }
  }, [dispatch, weatherName]);

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
        <div className={styles.loading}>칵테일 정보 수신 불가</div>
      )}
    </>
  );
}

export default GetCocktail;
