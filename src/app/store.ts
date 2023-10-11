import { configureStore } from '@reduxjs/toolkit';
import coordinatesReducer from '../features/coordinatesSlice';
import isCheckedReducer from '../features/isCheckedSlice';
import searchResultsReducer from '../features/searchResultsSlice';
import weatherReducer from '../features/weatherSlice'; // weatherSlice.reducer을 새이름으로 import
import cocktailReducer from '../features/cocktailSlice'; // cocktailSlice.reducer을 새이름으로 import

const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
    isChecked: isCheckedReducer,
    searchResults: searchResultsReducer,

    weather: weatherReducer,
    cocktail: cocktailReducer,
  },
});

// selector, state에 접근할 때 타입 안정성을 보장받기 위해 사용
export type RootState = ReturnType<typeof store.getState>;
// dispatch 접근시 타입 안정성을 위한 dispatch 타입
export type AppDispatch = typeof store.dispatch;

export { store };
