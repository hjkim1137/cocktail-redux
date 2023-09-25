import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CATEGORY from './Constant';
import { RootState, AppDispatch } from '../../store/store';
import { setIsChecked } from '../../features/isCheckedSlice';
import styles from './Checkbox.module.scss';

interface checkBoxPropsType {
  isCheckedAll: boolean;
  setIsCheckedAll: React.Dispatch<React.SetStateAction<boolean>>;
}

function Checkbox({ isCheckedAll, setIsCheckedAll }: checkBoxPropsType) {
  const isChecked = useSelector((state: RootState) => state.isChecked);
  const dispatch = useDispatch<AppDispatch>();

  // 디버깅
  useEffect(() => {
    console.log('isChecked 변경', isChecked);
  }, [isChecked]);

  // 카테고리 체크박스에서 체크 이벤트가 발생했을 때 isChecked 목록 변경
  const handleIsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      const addIsChecked = [...isChecked, value];
      dispatch(setIsChecked(addIsChecked));
      return;
    }
    const subIsChecked = isChecked.filter((category) => category !== value);
    dispatch(setIsChecked(subIsChecked));
  };

  // 단일 체크박스 상태가 변경된 경우
  useEffect(() => {
    const categories = Object.values(CATEGORY);
    if (isCheckedAll && isChecked.length === categories.length - 1) {
      setIsCheckedAll(() => false);
    }
    if (isChecked.length !== categories.length) {
      setIsCheckedAll(() => false);
    }
  }, [isChecked]);

  // All 체크박스 상태가 변경된 경우
  useEffect(() => {
    const categories = Object.values(CATEGORY);
    if (!isCheckedAll && isChecked.length === categories.length) {
      dispatch(setIsChecked([]));
      return;
    }
    if (!isCheckedAll && isChecked.length !== categories.length) {
      return;
    }
    const allCheckboxOps = [...categories];
    const newIsChecked =
      isChecked.length !== categories.length ? allCheckboxOps : isChecked;
    dispatch(setIsChecked(newIsChecked));
    return;
  }, [isCheckedAll]);

  return (
    <>
      {Object.values(CATEGORY).map((category, idx) => (
        <>
          <label
            key={idx + 1}
            htmlFor={`checkbox-${idx + 1}`}
            className={styles.label}
          >
            <input
              type="checkbox"
              className={styles.checkbox}
              id={`checkbox-${idx + 1}`}
              checked={isChecked.includes(category)}
              value={category}
              onChange={handleIsChecked}
            />
            <span className={styles.checkmark}></span>
            {category}
          </label>
        </>
      ))}
    </>
  );
}

export default Checkbox;
