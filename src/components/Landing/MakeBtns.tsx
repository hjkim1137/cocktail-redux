import styles from './CocktailMatch.module.scss';
import { useNavigate } from 'react-router-dom';

interface MakeBtnsProps {
  cocktailId: string;
  cocktailName: string;
  reloadCocktail: () => void;
}

function MakeBtns({ cocktailId, cocktailName, reloadCocktail }: MakeBtnsProps) {
  // 구글 검색 기능
  const navigate = useNavigate();
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
  const handleButtonClickForReload = () => {
    reloadCocktail();
  };

  return (
    <div className={styles.buttonBox}>
      <button onClick={handleGoogleSearch} className={styles.googleBtn}>
        칵테일 정보 Google 검색
      </button>
      <button onClick={handleButtonClickForDetail} className={styles.learnBtn}>
        칵테일 제조법 알아보기
      </button>
      <button onClick={handleButtonClickForReload} className={styles.againBtn}>
        다시 추천받기
      </button>
    </div>
  );
}

export default MakeBtns;
