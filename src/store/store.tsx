import { configureStore } from '@reduxjs/toolkit';
import coordinatesReducer from './coordinatesSlice';
import isCheckedReducer from './isCheckedSlice';
import searchResultsReducer from './searchResultsSlice';
import weatherReducer from './weatherSlice';
import cocktailReducer from './cocktailSlice';

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
