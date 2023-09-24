// components/MakeBtns.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import styles from './MakeBtns.module.scss';

function MakeBtns() {
  const navigate = useNavigate();

  const cocktailId = useSelector(
    (state: RootState) => state.cocktail.cocktailInfo?.idDrink
  );
  const cocktailName = useSelector(
    (state: RootState) => state.cocktail.cocktailInfo?.strDrink
  );

  // 구글 검색 기능
  const handleGoogleSearch = () => {
    if (cocktailName) {
      const searchWord = cocktailName;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchWord
      )}`;
      window.open(searchUrl, '_blank');
    }
  };

  // 칵테일 상세(제조법) 알아보기
  const handleButtonClickForDetail = () => {
    if (cocktailId) {
      navigate(`/detail/${cocktailId}`);
    } else {
      console.error('칵테일 상세 페이지로 이동 중 에러 발생');
    }
  };

  // 다시 추천 받기
  const [reloadKey, setReloadKey] = useState(0);
  const handleButtonClickForReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <div className={styles.buttonBox}>
      <button onClick={handleGoogleSearch} className={styles.googleBtn}>
        칵테일 정보 Google 검색
      </button>
      <button onClick={handleButtonClickForDetail} className={styles.learnBtn}>
        제조법 알아보기
      </button>
      <button onClick={handleButtonClickForReload} className={styles.againBtn}>
        다시 추천받기
      </button>
    </div>
  );
}

export default MakeBtns;
