import { configureStore } from '@reduxjs/toolkit';
import coordinatesReducer from '../features/coordinatesSlice';
import isCheckedReducer from '../features/isCheckedSlice';
import searchResultsReducer from '../features/searchResultsSlice';
import weatherReducer from '../features/weatherSlice';
import cocktailReducer from '../features/cocktailSlice';

const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
    isChecked: isCheckedReducer,
    searchResults: searchResultsReducer,

    weather: weatherReducer,
    cocktail: cocktailReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export { store };
