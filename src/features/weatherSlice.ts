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
      state.weatherInfo = action.payload;
    },
  },
});

export const { setWeatherInfo } = weatherSlice.actions;
export default weatherSlice.reducer;
