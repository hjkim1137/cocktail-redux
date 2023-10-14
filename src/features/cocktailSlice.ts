import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WGobject from '../components/Home/getCocktail/WGobject';
import { CocktailState, Cocktail } from './cocktailSlice.interface';
import { getGlassTypeAPI } from '../API/CocktailAPI';

export const fetchCocktail = createAsyncThunk<Cocktail, string>(
  'cocktail/fetchCocktail',
  async (weatherName) => {
    try {
      const glassType: any = WGobject[weatherName];
      const cocktailArr = await getGlassTypeAPI(glassType); // getGlassTypeAPI 함수 호출, return: cocktailArr
      const randomIndex = Math.floor(Math.random() * cocktailArr.length);
      return cocktailArr[randomIndex];
    } catch (error) {
      console.error(
        '서버와 통신에 실패하였습니다. 나중에 다시 시도해주세요.',
        error
      );
      throw error;
    }
  }
);

const initialState: CocktailState = {
  cocktailInfo: null,
  status: 'idle',
};

const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {}, // 동기 작업
  extraReducers: (builder) => {
    // 비동기 작업
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
