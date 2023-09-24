import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WGobject from '../components/Landing/WGobject';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface CocktailState {
  cocktailInfo: Cocktail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CocktailState = {
  cocktailInfo: null,
  status: 'idle',
};

export const fetchCocktail = createAsyncThunk<Cocktail, string>(
  'cocktail/fetchCocktail',
  async (weatherName) => {
    const glassType: any = WGobject[weatherName];
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassType}`
    );
    const data = await response.json();
    const cocktailArr = data.drinks;
    const randomIndex = Math.floor(Math.random() * cocktailArr.length);
    return cocktailArr[randomIndex];
  }
);

const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCocktail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cocktailInfo = action.payload;
      })
      .addCase(fetchCocktail.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default cocktailSlice.reducer;
