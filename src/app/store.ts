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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
