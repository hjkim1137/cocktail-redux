import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWeatherData, getLocation } from '../API/WeatherAPI/index';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async () => {
    try {
      const position = await getLocation();
      const { latitude, longitude } = position.coords;
      const weatherData = await fetchWeatherData(latitude, longitude);
      return weatherData; // 상태 리턴
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

// 상태로 저장되는 weatherData의 타입 명시
interface WeatherType {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: any;
    description: string;
    icon: string;
  }[];
}

// null 체크
const initialState: WeatherType | null = null;

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export default weatherSlice.reducer;
