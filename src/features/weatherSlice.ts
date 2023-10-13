import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherType, WeatherState } from './weatherSlice.interface';

// initialState의 type
const initialState: WeatherState = {
  weatherInfo: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherInfo: (state, action: PayloadAction<WeatherType>) => {
      // setWeatherInfo: 단일 리듀서 함수(이 함수는 weather/setWeatherInfo와 같은 타입의 ㅡ슬라이스 이름과 리듀서 이름의 조합ㅡ액션을 처리하기 위한 것) 즉, 액션의 역할을 하며 동시에
      // state의 변화까지 구현한다. immer.js를 내장하고 있기에 state 값을 return하지 않아도 됨.
      // PayloadAction<T>: 특정 payload 타입을 가진 액션 객체
      state.weatherInfo = action.payload;
    },
  },
});

// actions 및 reducer 추출
export const { setWeatherInfo } = weatherSlice.actions;
export default weatherSlice.reducer;
