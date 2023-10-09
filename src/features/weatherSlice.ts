import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherType, WeatherState } from './weatherSlice.interface';

// null 체크
const initialState: WeatherState = {
  weatherInfo: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherInfo: (state, action: PayloadAction<WeatherType>) => {
      // PayloadAction: 액션의 payload 필드의 타입을 지정해주는 제네릭
      state.weatherInfo = action.payload;
    },
  },
});

export const { setWeatherInfo } = weatherSlice.actions;
export default weatherSlice.reducer;
