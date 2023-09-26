import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeatherData, getLocation } from '../API/WeatherAPI/index';
import { WeatherType, WeatherState } from './weatherSlice.interface';

const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
  try {
    const position = await getLocation();
    const { latitude, longitude } = position.coords;
    const weatherData = await fetchWeatherData(latitude, longitude);
    return weatherData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

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
