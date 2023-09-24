import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCocktail } from '../../store/cocktailSlice';
import styles from './path-to-styles.module.scss';
import MakeBtns from './MakeBtns';

interface GetCocktailProps {
  weatherName: string;
}

function GetCocktail({ weatherName }: GetCocktailProps) {
  const dispatch = useDispatch();
  const cocktailInfo = useSelector((state) => state.cocktail.cocktailInfo);
  const cocktailStatus = useSelector((state) => state.cocktail.status);

  useEffect(() => {
    if (cocktailStatus === 'idle') {
      dispatch(fetchCocktail(weatherName));
    }
  }, [dispatch, weatherName, cocktailStatus]);

  if (cocktailStatus === 'loading' || !cocktailInfo) {
    return <div className={styles.loading}>칵테일 제조중...</div>;
  }

  return (
    <div>
      <h4 className={styles.cocktailName}>{cocktailInfo.strDrink}</h4>
      <img
        src={cocktailInfo.strDrinkThumb}
        alt={cocktailInfo.strDrink}
        className={styles.drinkImg}
      />
      <MakeBtns
        cocktailId={cocktailInfo.idDrink}
        cocktailName={cocktailInfo.strDrink}
      />
    </div>
  );
}

export default GetCocktail;
