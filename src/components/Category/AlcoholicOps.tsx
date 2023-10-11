import React, { useState, useEffect, createContext } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import CheckboxAll from './CheckboxAll';
import CocktailList from './CocktailList';
import styles from './AlcoholicOps.module.scss';

type cocktailListType = {
  [key: string]: string;
};

export const AlcoholFilteredListContext = createContext<cocktailListType[]>([]);

function AlcoholicOps() {
  const searchResults = useSelector((state: RootState) => state.searchResults);
  const [alcoholicOps, setAlcoholicOps] = useState<string>('All');
  const [alcoholFilteredList, setAlcoholFilteredList] =
    useState<cocktailListType[]>(searchResults);

  //디버깅
  useEffect(() => {
    console.log('알코올 필터링 변경', alcoholicOps);
    console.log('알코올 필터링된 목록', alcoholFilteredList);
  }, [alcoholicOps, alcoholFilteredList]);

  //알코올 필터링
  useEffect(() => {
    setAlcoholFilteredList(() => {
      return searchResults;
    });
  }, [searchResults]);

  useEffect(() => {
    if (alcoholicOps !== 'All') {
      const newCocktailList = searchResults.filter(
        (cocktail) =>
          cocktail.strAlcoholic === alcoholicOps ||
          cocktail.strAlcoholic === 'Optional alcohol'
      );
      setAlcoholFilteredList(() => newCocktailList);
      return;
    }
    setAlcoholFilteredList(() => {
      const cocktailListNonOps = [...searchResults];
      return cocktailListNonOps;
    });
  }, [alcoholicOps]);

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.target as HTMLButtonElement;
    setAlcoholicOps(() => value);
  };

  return (
    <section className={styles.mainContents}>
      <nav className={styles.alcoholicFilterContainer}>
        <button
          className={
            alcoholicOps === 'All'
              ? styles.activeAlcoholicFilter
              : styles.alcoholicFilter
          }
          value="All"
          onClick={handleOnClick}
        >
          All
        </button>
        <button
          className={
            alcoholicOps === 'Alcoholic'
              ? styles.activeAlcoholicFilter
              : styles.alcoholicFilter
          }
          value="Alcoholic"
          onClick={handleOnClick}
        >
          Alcoholic
        </button>
        <button
          className={
            alcoholicOps === 'Non alcoholic'
              ? styles.activeAlcoholicFilter
              : styles.alcoholicFilter
          }
          value="Non alcoholic"
          onClick={handleOnClick}
        >
          Non-Alcoholic
        </button>
      </nav>
      <div className={styles.contentsContainer}>
        <AlcoholFilteredListContext.Provider value={alcoholFilteredList}>
          <CheckboxAll />
          <CocktailList />
        </AlcoholFilteredListContext.Provider>
      </div>
    </section>
  );
}

export default AlcoholicOps;
