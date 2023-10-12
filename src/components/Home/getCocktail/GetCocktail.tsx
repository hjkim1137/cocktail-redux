import { useEffect } from 'react';
import { fetchCocktail } from '../../../features/cocktailSlice';
import MakeBtns from '../makeBtns/MakeBtns';
import styles from '../home.module.scss';
import { GetCocktailProps } from './getCocktail.interface';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

function GetCocktail({ weatherName }: GetCocktailProps) {
  // [트러블 슈팅]
  // const dispatch = useDispatch<AppDispatch>(); 이렇게 명시 안하면
  // 아래 dispatch(fetchCocktail(weatherName)); 부분에서
  // 'AsyncThunkAction<Cocktail, string, AsyncThunkConfig>' 형식의 인수는'AnyAction' 형식의 매개 변수에 할당될 수 없다는 오류발생

  // [문제 원인]
  // Redux의 store.dispatch 메서드는 기본적으로 Redux의 'AnyAction' 타입을 기대합니다.
  // 반면 비동기 작업을 처리하는 thunk action creators는 'AsyncThunkAction'이라는 특수한 타입의 액션을 반환합니다.
  // 때문에 기대되는 반환 값이 달라 발생하는 문제임

  // [해결 방법]
  // useDispatch 훅에서 반환되는 dispatch 함수의 타입을 명시적으로 AppDispatch로 지정하는 것
  // 이렇게 하면, dispatch 함수는 thunk action creators에서 반환되는 액션들도 처리할 수 있게 됨

  // useAppSelector, useAppDispatch hook 사용하기(hook 사용 안할 시 위와 같은 방법으로 해야함)
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
