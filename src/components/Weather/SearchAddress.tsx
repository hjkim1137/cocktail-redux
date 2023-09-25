import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { GeocoderAPI } from '../../API/WeatherAPI/index';
import { useDispatch, Provider } from 'react-redux';
import { setCoordinates } from '../../features/coordinatesSlice';
import { RootState, store } from '../../store/store';
import styles from './SearchAddress.module.scss';

const themeObj = {
  bgColor: '#7A86B6', //바탕 배경색
  searchBgColor: '#495C83', //검색창 배경색
  contentBgColor: '#ECF2FF', //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
  pageBgColor: '#FAFAFA', //페이지 배경색
  //textColor: "", //기본 글자색
  queryTextColor: '#FFFFFF', //검색창 글자색
  //postcodeTextColor: "", //우편번호 글자색
  //emphTextColor: "", //강조 글자색
  outlineColor: '#495C83', //테두리
};

export function SearchAddress(): JSX.Element {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  const dispatch = useDispatch();

  const [geocoderData, setGeocoderData] = useState(null);

  const handleSearchAddressButton = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      console.log(`
            주소: ${data.address},
            우편번호: ${data.zonecode}
        `);
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  useEffect(() => {
    const getGeocoderData = async () => {
      try {
        const result = await GeocoderAPI(address);
        console.log(result);
        setGeocoderData(result);

        dispatch(
          setCoordinates({
            lat: result.y,
            lon: result.x,
          })
        );
      } catch (error) {
        console.error();
      }
    };
    getGeocoderData();
  }, [openPostcode, address]);

  return (
    <Provider store={store}>
      <div className={styles.searchAddress}>
        <h3>주소를 검색해서 해당 지역 날씨에 맞는 칵테일을 추천받아 보세요!</h3>
        <button onClick={handleSearchAddressButton.clickButton}>
          주소 검색
        </button>

        {openPostcode && (
          <DaumPostcode
            theme={themeObj}
            onComplete={handleSearchAddressButton.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          />
        )}
      </div>
    </Provider>
  );
}
